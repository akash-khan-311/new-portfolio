/* eslint-disable react-hooks/immutability */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Maximize2, Mic, Paperclip, Trash2, X } from "lucide-react";
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
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("ai-chat-messages");

      return savedMessages ? JSON.parse(savedMessages) : [];
    }

    return [];
  });
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages.length]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const handleVoice = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();

      await SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
    }
  };
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);
  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages.length]);
  useEffect(() => {
    localStorage.setItem("ai-chat-messages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    setIsDark(theme === "dark");
  }, []);
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  const t = {
    pageBg: isDark ? "#111111" : "#f2f1ed",
    cardBg: isDark ? "#1c1c1c" : "#ffffff",
    border: isDark ? "#2a2a2a" : "#e4e2da",
    textPrimary: isDark ? "#f0f0f0" : "#111111",
    textSecondary: isDark ? "#777" : "#888",
    textMuted: isDark ? "#444" : "#bbb",
    inputBg: isDark ? "#252525" : "#eceae4",
    inputBorder: isDark ? "#333" : "#dbd9d0",
    quickBtnBg: isDark ? "#222" : "#fafaf7",
    quickBtnBorder: isDark ? "#2e2e2e" : "#e0dfd8",
    quickBtnHover: isDark ? "#2a2a2a" : "#f0efe8",
    userBubbleBg: "#a855f7",
    aiBubbleBg: isDark ? "#252525" : "#f7f6f2",
    aiBubbleBorder: isDark ? "#2e2e2e" : "#e4e2da",
    scrollbarThumb: isDark ? "#333" : "#ccc",
    toggleBg: isDark ? "#252525" : "#e8e6e0",
    toggleBorder: isDark ? "#363636" : "#d4d2ca",
    iconColor: isDark ? "#555" : "#bbb",
    iconHover: isDark ? "#888" : "#666",
    sendBg: isDark ? "#f0f0f0" : "#111",
    sendIcon: isDark ? "#111" : "#fff",
    sendDisabledBg: isDark ? "#2a2a2a" : "#e0dfd8",
    sendDisabledIcon: isDark ? "#444" : "#bbb",
  };

  const handleQuickAction = (label: string, description: string) => {
    handleSend(`${label} — ${description}`);
  };

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

    // ✅ FIX: build correct payload manually (NOT stale state)
    const payload = {
      messages: [
        ...messages,
        userMessage, // safe enough now because we don't rely on UI state
      ],
    };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      setIsTyping(false);
      if (done) {
        setIsTyping(false);
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: fullText } : m,
        ),
      );
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 150) + "px";
    }
  };
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
  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className={`absolute bottom-0 right-0  flex items-center justify-center  min-w-lg`}
    >
      {/* Card */}
      <div
        className="transition-all duration-300"
        style={{
          width: isMaximized ? "40vw" : 400,

          height: isMaximized ? "90vh" : 600,
          maxHeight: 700,
          backgroundColor: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 20,
          overflowY: "auto",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: isDark
            ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)"
            : "0 24px 60px rgba(0,0,0,0.12)",
          transition:
            "width 0.3s ease-in-out, height 0.3s ease-in-out, background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: `1px solid ${t.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #34d399, #0d9488)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(52,211,153,0.35)",
                }}
              >
                <span className="">AK</span>
              </div>
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 9,
                  height: 9,
                  backgroundColor: "#4ade80",
                  borderRadius: "50%",
                  border: `2px solid ${t.cardBg}`,
                }}
              />
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13.5,
                  color: t.textPrimary,
                }}
              >
                Assistant
              </span>
              <span
                style={{ fontSize: 12, color: t.textSecondary, marginLeft: 7 }}
              >
                built by Akash Ali
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              className="p-2 hover:bg-white/5 rounded-md transition-colors duration-100 cursor-pointer text-white/50"
              onClick={() => {
                setMessages([]);
                setShowWelcome(true);

                localStorage.removeItem("ai-chat-messages");
              }}
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={handleMaximize}
              className="p-2 hover:bg-white/5 rounded-md transition-colors duration-100 cursor-pointer text-white/50"
            >
              <Maximize2 size={13} />
            </button>
            <button
              className="p-2 hover:bg-white/5 rounded-md transition-colors duration-100 cursor-pointer text-white/50"
              onClick={() => setIsOpen(false)}
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            scrollbarWidth: "thin",
            scrollbarColor: `${t.scrollbarThumb} transparent`,
          }}
        >
          {showWelcome ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: t.textPrimary,
                    margin: "0 0 6px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hello there! 🤚
                </p>
                <p style={{ fontSize: 15, color: t.textSecondary, margin: 0 }}>
                  How can I help you today?
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => handleQuickAction(a.label, a.description)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: `1px solid ${t.quickBtnBorder}`,
                      backgroundColor: t.quickBtnBg,
                      cursor: "pointer",
                      transition: "background-color 0.15s, transform 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.backgroundColor = t.quickBtnHover;
                      b.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.backgroundColor = t.quickBtnBg;
                      b.style.transform = "translateX(0)";
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: t.textPrimary,
                      }}
                    >
                      {a.label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: t.textSecondary,
                        marginLeft: 8,
                      }}
                    >
                      {a.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    {msg.role === "assistant" && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #34d399, #0d9488)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          AK
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        height: "100%",
                        overflowX: "hidden",
                        wordBreak: "break-word",
                        maxWidth: "72%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        backgroundColor:
                          msg.role === "user" ? t.userBubbleBg : t.aiBubbleBg,
                        color: msg.role === "user" ? "#fff" : t.textPrimary,
                        border:
                          msg.role === "assistant"
                            ? `1px solid ${t.aiBubbleBorder}`
                            : "none",
                        boxShadow:
                          msg.role === "user"
                            ? "0 2px 10px rgba(22,163,74,0.25)"
                            : "none",
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
              {isTyping && (
                <div
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #34d399, #0d9488)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    AK
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "18px 18px 18px 4px",
                      backgroundColor: t.aiBubbleBg,
                      border: `1px solid ${t.aiBubbleBorder}`,
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#a855f7",
                          display: "inline-block",
                          animation: "bounce 1s infinite",
                          animationDelay: `${d}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: "10px 16px 16px",
            borderTop: `1px solid ${t.border}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              borderRadius: 16,
              border: `1px solid ${t.inputBorder}`,
              backgroundColor: t.inputBg,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              className="w-full resize-none outline-none bg-transparent text-white placeholder:text-white/50"
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Send a message... (type / for commands)"
              rows={1}
              style={{
                width: "100%",
                padding: "12px 16px 4px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: t.textPrimary,
                fontFamily: "inherit",
                maxHeight: 150,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 10px 10px",
              }}
            >
              <div style={{ display: "flex", gap: 4 }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileUpload}
                />

                <button
                  className="p-2 hover:bg-white/5 rounded-md transition-colors duration-100 cursor-pointer text-white/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip size={13} />
                </button>
                <button
                  className={`p-2 rounded-md transition-colors duration-100 cursor-pointer ${
                    listening
                      ? "bg-green-500/20 text-green-400"
                      : "text-white/50 hover:bg-white/5"
                  }`}
                  onClick={() => {
                    if (!browserSupportsSpeechRecognition) {
                      alert("Browser doesn't support speech recognition");
                      return;
                    }

                    if (listening) {
                      SpeechRecognition.stopListening();
                    } else {
                      resetTranscript();

                      SpeechRecognition.startListening({
                        continuous: true,
                      });
                    }
                  }}
                >
                  <Mic size={13} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: input.trim() ? t.sendBg : t.sendDisabledBg,
                    color: input.trim() ? t.sendIcon : t.sendDisabledIcon,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    transition: "background-color 0.2s, transform 0.1s",
                    boxShadow: input.trim()
                      ? "0 2px 8px rgba(0,0,0,0.2)"
                      : "none",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (input.trim())
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollbarThumb}; border-radius: 4px; }
      `}</style>
    </div>
  );
}
