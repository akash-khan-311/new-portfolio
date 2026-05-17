"use client";

import React, { useState } from "react";

import Image, { StaticImageData } from "next/image";
import { TExperience } from "@/interface";
import { formattedDate } from "@/lib/formattedDate";

// Data for the FAQ section, including icons

interface AccordionItemProps {
  item: TExperience;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          <Image
            src={item.image as string | StaticImageData}
            alt={item.company}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="flex flex-col">
            <span className="text-base font-medium text-gray-800 dark:text-gray-200">
              {item.position}
            </span>
            <span className="text-sm text-gray-400">{item.company}</span>
          </p>
        </div>
        <div className="text-gray-400 text-sm ">
          {formattedDate(item.startDate)}
          <span> ─ </span>

          {item.endDate === "Present" ? (
            <span> (Currently Working)</span>
          ) : (
            formattedDate(item.endDate)
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 pl-12">
          <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function AccordionSection({ items }: { items: TExperience[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="p-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            {items?.map((item: TExperience, index: number) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex == index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
