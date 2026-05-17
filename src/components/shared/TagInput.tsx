"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  unique?: boolean;
};

export default function TagInput({
  value = [],
  onChange,
  placeholder = "Add item",
  className,
  unique = true,
}: Props) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    // Prevent duplicate
    if (unique) {
      const exists = value.some(
        (item) => item.toLowerCase() === trimmed.toLowerCase(),
      );

      if (exists) {
        setInput("");
        return;
      }
    }

    onChange?.([...value, trimmed]);

    setInput("");
  };

  const removeTag = (tag: string) => {
    const updated = value.filter((item) => item !== tag);
    onChange?.(updated);
  };

  return (
    <div className="space-y-2">
      <div
        className={`flex flex-wrap gap-2 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-slate-900 ${className}`}
      >
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600 text-white text-sm"
          >
            <span>{tag}</span>

            <button type="button" onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 min-w-30 bg-transparent outline-none text-black dark:text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
      </div>
    </div>
  );
}
