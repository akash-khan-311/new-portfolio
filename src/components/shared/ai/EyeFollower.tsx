/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useEffect, useRef, useState } from "react";
import AIChatbox from "./ChatBox";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function EyeFollower() {
  const eyeRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const rect = eyeRef.current.getBoundingClientRect();

      const eyeX = rect.left + rect.width / 1;
      const eyeY = rect.top + rect.height / 1;

      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;

      //  radius control
      const maxDistance = 4; 

      const angle = Math.atan2(dy, dx);

      const distance = Math.min(maxDistance, Math.sqrt(dx * dx + dy * dy));

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <div className="aui-root aui-modal-anchor fixed right-4 bottom-20 sm:bottom-6 z-50">
        <div className="relative" style={{ opacity: 1, transform: "none" }}>
          <button
            onClick={() => setOpen(!open)}
            ref={eyeRef}
            className="inline-flex bg-white items-center justify-center gap-2 whitespace-nowrap text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer  aui-button-icon p-1 aui-modal-button sm:size-md aspect-square size-14 rounded-full shadow transition-transform active:scale-90"
            type="button"
          >
            <div
              className="bg-bg-950 relative flex aspect-square h-6 w-8 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <div className="flex w-[90%] items-center justify-between gap-1">
                <div className="relative flex h-4 w-3 items-center justify-center overflow-hidden rounded-[50%] bg-white outline-2 outline-black">
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div
                      className="relative h-2 w-2 rounded-full bg-black"
                      style={{
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                      }}
                    >
                      <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
                <div className="relative flex h-4 w-3 items-center justify-center overflow-hidden rounded-full bg-white outline-2 outline-black">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div
                      className="absolute w-2 h-2 rounded-full bg-black"
                      style={{
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                      }}
                    >
                      <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="aui-sr-only sr-only">Open Assistant</span>
            <span className="aui-sr-only sr-only">Open Assistant</span>
          </button>
          {open && <AIChatbox setIsOpen={setOpen} />}
        </div>
      </div>
    </>
  );
}
