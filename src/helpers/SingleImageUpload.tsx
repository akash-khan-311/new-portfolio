/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<any>;
  resetTrigger?: boolean;
  existingImage?: string;
  fieldName?: string;
};

export default function SingleImageUploadField({
  setValue,
  resetTrigger,
  existingImage,
  fieldName = "image",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // existing image set
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  // reset form
  useEffect(() => {
    if (resetTrigger) {
      setPreview(existingImage || null);

      setValue(fieldName, null, {
        shouldValidate: false,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [resetTrigger, existingImage, setValue, fieldName]);

  // handle upload
  const handleFile = (file: File | null) => {
    if (!file) return;

    // remove old preview blob url
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    setValue(fieldName, file as any, {
      shouldValidate: true,
    });
  };

  // remove image
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // cleanup blob url
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    setValue(fieldName, null, {
      shouldValidate: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <div
        className="
          border-2 border-dashed border-white/15
          rounded-2xl
          p-8
          text-center
          cursor-pointer
          transition-all
          duration-300
          hover:border-white/30
          hover:bg-white/2
          bg-white/1
        "
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          const file = e.dataTransfer.files?.[0];

          handleFile(file || null);
        }}
      >
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div
            className="
              w-14 h-14
              rounded-full
              border border-white/10
              flex items-center justify-center
              bg-white/3
            "
          >
            <Upload size={24} />
          </div>

          <div>
            <p className="font-medium text-white">Drag & Drop Image</p>

            <p className="text-sm text-gray-400 mt-1">
              Or click to image upload from your computer
            </p>
          </div>

          <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <Image src={preview} alt="preview" fill className="object-cover" />

          {/* Overlay */}
          <div
            className="
              absolute inset-0
              bg-black/0
              hover:bg-black/20
              transition-all duration-300
            "
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="
              absolute top-2 right-2
              w-6 h-6
              rounded-full
              bg-red-500
              hover:bg-red-600
              transition-all
              duration-200
              flex items-center justify-center
              text-white
              shadow-lg
              cursor-pointer
            "
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
