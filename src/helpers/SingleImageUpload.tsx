/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Upload } from "lucide-react";
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

  // set existing image once
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  // reset logic
  useEffect(() => {
    if (resetTrigger) {
      setPreview(existingImage || null);
      setValue(fieldName, null);
    }
  }, [resetTrigger, existingImage, setValue, fieldName]);

  const handleFile = (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);
    setValue(fieldName, file as any, {
      shouldValidate: true,
    });
  };

  return (
    <div className="mb-6">
      <div
        className="border-2 border-dashed border-gray-500 bg- rounded-lg p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0] || null);
        }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <Upload />
          <p>Drag & drop or click to upload</p>
          <p className="text-sm">JPEG, PNG, WEBP</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </div>

      {preview && (
        <div className="mt-4 relative w-40 h-40 rounded overflow-hidden shadow-lg">
          <Image src={preview} alt="preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
