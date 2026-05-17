/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller, FieldErrors, UseFormRegister } from "react-hook-form";

import ComboBox from "@/components/ui/combo-box";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import TagInput from "./TagInput";

type FormFieldProps = {
  readOnly?: boolean;
  label: string;
  name: string;
  disabled?: boolean;
  errorMessage?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  control?: any;
  className?: string;
  type?:
    | "text"
    | "email"
    | "tag"
    | "number"
    | "date"
    | "file"
    | "textarea"
    | "select"
    | "checkbox"
    | "password"
    | "combobox"
    | "radio";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  isArray?: boolean;
  fields?: { id: string }[];
  append?: () => void;
};

const FormField: React.FC<FormFieldProps> = ({
  readOnly,
  label,
  errorMessage,
  name,
  disabled,
  register,
  errors,
  type = "text",
  placeholder,
  options = [],
  required = false,
  isArray = false,
  fields = [],
  control,
  className,
  append,
}) => {
  const error = errors?.[name];

  // 🔹 Dynamic array input
  if (isArray && fields.length > 0) {
    return (
      <div className="w-full">
        <label className="block font-semibold mb-2 text-white">{label}</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`${name}.${index}.value`, {
                required: required ? errorMessage : false,
              })}
              className={`flex-1 px-4 py-2 border text-white border-gray-3  rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
              placeholder={placeholder || label}
            />
            {index === fields.length - 1 && append && (
              <button
                type="button"
                onClick={append}
                className="bg-blue-500 text-white px-3 rounded"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1 w-full">
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {type === "file" ? (
        <Input
          className="text-white "
          id={name}
          {...register(name, {
            required: required ? errorMessage : false,
          })}
          type={type}
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          placeholder={placeholder}
        />
      ) : type === "date" ? (
        <div className="space-y-1 w-full">
          <Controller
            control={control}
            name={name}
            rules={{ required: required ? errorMessage : false }}
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value)
                : undefined;

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={disabled}
                      variant="outline"
                      className="w-full py-5 text-white hover:text-white justify-between"
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      captionLayout="dropdown"
                      onSelect={(date) => field.onChange(date?.toISOString())}
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </div>
      ) : type === "tag" ? (
        <Controller
          name={name}
          control={control}
          rules={{
            required: required ? errorMessage : false,
          }}
          render={({ field }) => (
            <TagInput
              value={field.value || []}
              onChange={field.onChange}
              placeholder={placeholder}
              className={className}
            />
          )}
        />
      ) : type === "combobox" ? (
        <div className="space-y-1 w-full">
          <Controller
            name={name}
            control={control}
            rules={{
              required: required ? errorMessage : false,
            }}
            render={({ field }) => (
              <ComboBox
                value={field.value}
                options={options || []}
                placeholder={placeholder}
                className={className}
                onSelect={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
      ) : type === "textarea" ? (
        <textarea
          {...register(name, {
            required: required ? errorMessage : false,
          })}
          id={name}
          placeholder={placeholder}
          className={`w-full px-4 py-2 text-white border border-gray-3 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
          rows={name === "address" ? 4 : 9}
        />
      ) : type === "radio" ? (
        <div className="flex gap-5">
          {options.map((opt) => (
            <label
              htmlFor={opt}
              key={opt}
              className="flex items-center gap-2 text-white"
            >
              <Input
                id={opt}
                className=""
                type="radio"
                value={opt}
                {...register(name, {
                  required: required ? errorMessage : false,
                })}
              />
              {opt}
            </label>
          ))}
        </div>
      ) : name === "slug" ? (
        <input
          id={name}
          readOnly={readOnly}
          {...register(name, {
            required: required ? errorMessage : false,
          })}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-2  border border-gray-3 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all  ${className}`}
        />
      ) : (
        <input
          id={name}
          {...register(name, {
            required: required ? errorMessage : false,
          })}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-3 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
        />
      )}

      {error && (
        <p className="text-red-500 text-sm">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormField;
