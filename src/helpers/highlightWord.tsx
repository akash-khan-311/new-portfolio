import React from "react";

export function highlightWord(text: string, word: string, className: string) {
  if (!text || !word) return text;

  const parts = text.split(word);

  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i !== parts.length - 1 && <span className={className}>{word}</span>}
    </React.Fragment>
  ));
}
