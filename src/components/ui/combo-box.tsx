/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";

interface ComboBoxProps {
  value?: string;
  options: string[];
  placeholder?: string;
  className?: string;
  onSelect?: (option: string | null) => void;
}

const ComboBox = ({
  options = [],
  value,
  placeholder = "Select an option...",
  onSelect,
  className,
}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const comboBoxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // =========================
  // Sync with react-hook-form
  // =========================
  useEffect(() => {
    setInputValue(value ? String(value) : "");
    setSelectedOption(value || null);
  }, [value]);

  // =========================
  // Filter options
  // =========================
  useEffect(() => {
    if (inputValue === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    }

    setHighlightedIndex(-1);
    optionRefs.current = [];
  }, [inputValue, options]);

  // =========================
  // Scroll selected option
  // =========================
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  // =========================
  // Close outside click
  // =========================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboBoxRef.current &&
        !comboBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // Input change
  // =========================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setSelectedOption(null);
  };

  // =========================
  // Select option
  // =========================
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setInputValue(option);
    setIsOpen(false);
    setHighlightedIndex(-1);

    onSelect?.(option);
  };

  // =========================
  // Clear
  // =========================
  const handleClearSelection = () => {
    setInputValue("");
    setSelectedOption(null);
    setIsOpen(false);

    onSelect?.(null);
  };

  // =========================
  // Keyboard support
  // =========================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );

        break;

      case "ArrowUp":
        e.preventDefault();

        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );

        break;

      case "Enter":
        e.preventDefault();

        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }

        break;

      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={comboBoxRef}>
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3 pr-20 border  border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${className}`}
        />

        {/* CLEAR BUTTON */}
        {selectedOption && (
          <button
            type="button"
            onClick={handleClearSelection}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        )}

        {/* DROPDOWN BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* OPTIONS */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={option}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                type="button"
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-4 py-3 capitalize transition-colors ${
                  highlightedIndex === index
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
