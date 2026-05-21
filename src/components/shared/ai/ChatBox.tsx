"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  CircleStop,
  Maximize2,
  Mic,
  Paperclip,
  Trash2,
  X,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  { label: "About Me", description: "Who are you?" },
  { label: "Skills & Expertise", description: "View your core skills" },
  { label: "Work Experience", description: "See past experience" },
  { label: "Projects", description: "Explore notable projects" },
  {
    label: "Contact & Collaboration",
    description: "How can we work together?",
  },
];

export default function AIChatbox({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai-chat-messages");

      return saved ? JSON.parse(saved) : [];
    }

    return [];
  });

  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // scroll to bottom on new message

  useEffect(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages]);

  // save the chat

  useEffect(() => {
    localStorage.setItem("ai-chat-messages", JSON.stringify(messages));

    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  // voice

  const handleVoice = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition");

      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();

      return;
    }

    resetTranscript();

    await SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  // send message

  const handleSend = async (customInput?: string) => {
    const text = (customInput ?? input).trim();

    if (!text) return;

    setShowWelcome(false);
    setIsTyping(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const assistantId = crypto.randomUUID();

    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    const updatedMessages = [...messages, userMessage];

    const payload = {
      messages: updatedMessages,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.body) return;

      const reader = response.body.getReader();

      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setIsTyping(false);

          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        fullText += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: fullText,
                }
              : m,
          ),
        );
      }
    } catch (error) {
      console.error(error);

      setIsTyping(false);
    }
  };

  // handle textarea enter key

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  // auto resize textarea

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const ta = textareaRef.current;

    if (ta) {
      ta.style.height = "auto";

      ta.style.height = `${Math.min(ta.scrollHeight, 150)}px`;
    }
  };

  // handle file upload

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setInput((prev) => prev + "\n\n" + data.text);
  };

  // clear chat

  const clearChat = () => {
    setMessages([]);

    setShowWelcome(true);

    localStorage.removeItem("ai-chat-messages");
  };

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="absolute bottom-0 right-0 flex items-center justify-center"
    >
      {/* chat Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          transition-all duration-300 ease-in-out
          dark:bg-[#1c1c1c]
          bg-white
          border
          dark:border-[#2a2a2a]
          border-[#e4e2da]
          rounded-2xl
          flex
          flex-col
          overflow-hidden
          shadow-[0_24px_60px_rgba(0,0,0,0.12)]
          dark:shadow-[0_32px_80px_rgba(0,0,0,0.6)]
        "
        style={{
          width: isMaximized ? "40vw" : "400px",
          height: isMaximized ? "90vh" : "600px",
          maxHeight: "700px",
        }}
      >
        {/* header */}

        <div className="flex items-center justify-between px-5 py-3 border-b border-[#e4e2da] dark:border-[#2a2a2a] shrink-0">
          {/* left side */}

          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="
                  w-7.5
                  h-7.5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                "
                style={{
                  background: "linear-gradient(135deg, #34d399, #0d9488)",
                }}
              >
                AK
              </div>

              <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-green-400 border-2 border-white dark:border-[#1c1c1c]" />
            </div>

            <div>
              <h2 className="font-bold text-sm text-[#111] dark:text-[#f0f0f0]">
                Assistant
              </h2>

              <p className="text-xs text-[#666] dark:text-[#888]">
                built by Akash Ali
              </p>
            </div>
          </div>

          {/* right side */}

          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="
                p-2
                rounded-md
                transition-all
                duration-200
                cursor-pointer
                text-black/50
                dark:text-white/50
                hover:bg-black/5
                dark:hover:bg-white/5
              "
            >
              <Trash2 size={14} />
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="
                p-2
                rounded-md
                transition-all
                duration-200
                cursor-pointer
                text-black/50
                dark:text-white/50
                hover:bg-black/5
                dark:hover:bg-white/5
              "
            >
              <Maximize2 size={14} />
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="
                p-2
                rounded-md
                transition-all
                duration-200
                cursor-pointer
                text-black/50
                dark:text-white/50
                hover:bg-black/5
                dark:hover:bg-white/5
              "
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* chat  body */}

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {showWelcome ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold text-[#111] dark:text-[#f0f0f0]">
                  Hello there! 🤚
                </h1>

                <p className="text-sm text-[#666] dark:text-[#888] mt-1">
                  How can I help you today?
                </p>
              </div>

              <div className="w-full flex flex-col gap-2">
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => handleSend(`${a.label} — ${a.description}`)}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#e0dfd8]
                      dark:border-[#2e2e2e]
                      bg-[#fafaf7]
                      dark:bg-[#222]
                      hover:bg-[#f0efe8]
                      dark:hover:bg-[#2a2a2a]
                      transition-all
                      duration-200
                      hover:translate-x-1
                    "
                  >
                    <span className="font-bold text-sm text-[#111] dark:text-[#f0f0f0]">
                      {a.label}
                    </span>

                    <span className="ml-2 text-sm text-[#666] dark:text-[#888]">
                      {a.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messages
                  .filter((m) => {
                    if (m.role === "assistant" && !m.content) return false;
                    return true;
                  })
                  .map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={`flex gap-2 items-start ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* profile or avatar */}

                      {msg.role === "assistant" && (
                        <div
                          className="
                          w-7
                          h-7
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-white
                          text-xs
                          font-bold
                          shrink-0
                        "
                          style={{
                            background:
                              "linear-gradient(135deg, #34d399, #0d9488)",
                          }}
                        >
                          AK
                        </div>
                      )}

                      {/* message */}

                      <div
                        className={`max-w-[72%] px-4 py-2.5 text-[13.5px] leading-6 wrap-break-word ${
                          msg.role === "user"
                            ? `
                            rounded-[18px]
                            rounded-br-lg
                            bg-purple-500
                            text-white
                            shadow-md
                          `
                            : `
                            rounded-[18px]
                            rounded-bl-lg
                            bg-[#f7f6f2]
                            dark:bg-[#252525]
                            border
                            border-[#e4e2da]
                            dark:border-[#2e2e2e]
                            text-[#111]
                            dark:text-[#f0f0f0]
                          `
                        }`}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* typing indicator */}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div
                    className="
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white
                      text-xs
                      font-bold
                    "
                    style={{
                      background: "linear-gradient(135deg, #34d399, #0d9488)",
                    }}
                  >
                    AK
                  </div>

                  <div
                    className="
                      px-4
                      py-3
                      rounded-[18px]
                      rounded-bl-lg
                      bg-[#f7f6f2]
                      dark:bg-[#252525]
                      border
                      border-[#e4e2da]
                      dark:border-[#2e2e2e]
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-purple-500
                          animate-bounce
                        "
                        style={{
                          animationDelay: `${d}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* text input */}

        <div className="p-4 border-t border-[#e4e2da] dark:border-[#2a2a2a] shrink-0">
          <div
            className="
              rounded-2xl
              border
              border-[#dbd9d0]
              dark:border-[#333]
              bg-[#eceae4]
              dark:bg-[#252525]
              flex
              flex-col
              overflow-hidden
            "
          >
            {/* textarea */}

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Send a message..."
              className="
                w-full
                resize-none
                bg-transparent
                outline-none
                border-none
                px-4
                pt-3
                pb-1
                text-[13.5px]
                leading-6
                text-[#111]
                dark:text-[#f0f0f0]
                placeholder:text-black/40
                dark:placeholder:text-white/40
               max-h-37.5
              "
            />

            {/* actions */}

            <div className="flex items-center justify-between px-2 pb-2">
              {/* file upload and voice input */}

              <div className="flex items-center gap-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileUpload}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="
                    p-2
                    rounded-md
                    transition-all
                    duration-200
                    cursor-pointer
                    text-black/50
                    dark:text-white/50
                    hover:bg-black/5
                    dark:hover:bg-white/5
                  "
                >
                  <Paperclip size={14} />
                </button>

                <button
                  onClick={handleVoice}
                  className={`
                    p-2
                    rounded-md
                    transition-all
                    duration-200
                    cursor-pointer
                    ${
                      listening
                        ? "bg-purple-500/20 text-purple-400 animate-pulse"
                        : `
                          text-black/50
                          dark:text-white/50
                          hover:bg-black/5
                          dark:hover:bg-white/5
                        `
                    }
                  `}
                >
                  {listening ? <CircleStop size={14} /> : <Mic size={14} />}
                </button>
              </div>

              {/* send */}

              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-200
                  shrink-0
                  ${
                    input.trim()
                      ? `
                        bg-black
                        dark:bg-white
                        text-white
                        dark:text-black
                        hover:scale-110
                        cursor-pointer
                      `
                      : `
                        bg-[#e0dfd8]
                        dark:bg-[#2a2a2a]
                        text-[#bbb]
                        dark:text-[#444]
                        cursor-not-allowed
                      `
                  }
                `}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
