import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  X,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const STORAGE_KEY = "gymnance_ai_chat";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hey! 👋 I'm your GymNance AI Coach. You can talk to me naturally about workouts, nutrition, protein, recovery, progress, or anything related to your fitness journey. What are you working on today?",
};

const QUICK_PROMPTS = [
  "What workout should I do today?",
  "How much protein should I take?",
  "What should I eat after my workout?",
  "How can I improve my progress?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load AI chat:", error);
    }

    return [INITIAL_MESSAGE];
  });

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // ==========================================
  // SAVE CONVERSATION
  // ==========================================

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error("Failed to save AI chat:", error);
    }
  }, [messages]);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading, open]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (customMessage = null) => {
    const trimmedMessage = (
      customMessage ?? message
    ).trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Please log in to use your GymNance AI Coach.",
        },
      ]);

      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/ai-coach/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: trimmedMessage,

            // Send the complete conversation.
            history: conversation.map((item) => ({
              role: item.role,
              content: item.content,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to get AI response"
        );
      }

      const assistantReply =
        data.reply ||
        data.message ||
        "I couldn't generate a response right now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (error) {
      console.error(
        "AI Coach chat error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't connect to your AI Coach right now. Please make sure the GymNance server is running.",
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  // ==========================================
  // ENTER TO SEND
  // ==========================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // ==========================================
  // QUICK PROMPT
  // ==========================================

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt);
  };

  // ==========================================
  // NEW CHAT
  // ==========================================

  const startNewChat = () => {
    const confirmed = window.confirm(
      "Start a new AI Coach conversation?"
    );

    if (!confirmed) {
      return;
    }

    setMessages([INITIAL_MESSAGE]);

    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        "Failed to clear AI chat:",
        error
      );
    }
  };

  return (
    <>
      {/* ==========================================
          FLOATING AI BUTTON
      ========================================== */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-[100]
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-gradient-to-br from-[#D4AF37] to-[#F3D58A]
            text-black
            shadow-[0_0_30px_rgba(212,175,55,0.35)]
            transition-all duration-300
            hover:scale-110
          "
          aria-label="Open GymNance AI Coach"
        >
          <Bot
            size={25}
            strokeWidth={2}
          />
        </button>
      )}

      {/* ==========================================
          CHAT WINDOW
      ========================================== */}

      {open && (
        <div
          className="
            fixed
            bottom-4 right-4
            z-[100]
            flex flex-col
            h-[min(700px,calc(100vh-32px))]
            w-[410px]
            max-w-[calc(100vw-20px)]
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-[#0b090d]
            shadow-[0_20px_100px_rgba(0,0,0,0.7)]
          "
        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div
            className="
              flex items-center justify-between
              border-b border-white/10
              bg-gradient-to-r
              from-[#171119]
              to-[#0d0a10]
              px-5 py-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-[#D4AF37]/30
                  bg-[#D4AF37]/10
                  text-[#D4AF37]
                "
              >
                <Bot size={20} />
              </div>

              <div>

                <h3 className="text-sm font-semibold text-white">
                  GymNance Coach
                </h3>

                <div className="mt-0.5 flex items-center gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-green-400" />

                  <span className="text-xs text-green-400">
                    Online
                  </span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-1">

              {/* New conversation */}

              <button
                onClick={startNewChat}
                disabled={loading}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  text-white/40
                  transition
                  hover:bg-white/5
                  hover:text-[#f3d58a]
                "
                title="New conversation"
              >
                <RotateCcw size={17} />
              </button>

              {/* Close */}

              <button
                onClick={() => setOpen(false)}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  text-white/50
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
                aria-label="Close AI Coach"
              >
                <X size={20} />
              </button>

            </div>

          </div>

          {/* ==========================================
              MESSAGES
          ========================================== */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-4 py-5
            "
          >

            {messages.map((item, index) => {

              const isUser =
                item.role === "user";

              return (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {!isUser && (
                    <div
                      className="
                        mr-2 mt-1
                        flex h-7 w-7 shrink-0
                        items-center justify-center
                        rounded-lg
                        border border-[#D4AF37]/20
                        bg-[#D4AF37]/10
                        text-[#D4AF37]
                      "
                    >
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`
                      max-w-[82%]
                      whitespace-pre-wrap
                      rounded-2xl
                      px-4 py-3
                      text-sm
                      leading-6
                      ${
                        isUser
                          ? `
                            rounded-br-md
                            bg-gradient-to-r
                            from-[#D4AF37]
                            to-[#F3D58A]
                            text-black
                          `
                          : `
                            rounded-bl-md
                            border
                            border-white/10
                            bg-[#17131a]
                            text-white/80
                          `
                      }
                    `}
                  >
                    {item.content}
                  </div>

                </div>
              );
            })}

            {/* ==========================================
                QUICK PROMPTS
            ========================================== */}

            {messages.length === 1 &&
              !loading && (
                <div className="mt-5">

                  <div className="mb-3 flex items-center gap-2">

                    <Sparkles
                      size={14}
                      className="text-[#D4AF37]"
                    />

                    <span className="text-xs text-white/40">
                      Try asking
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {QUICK_PROMPTS.map(
                      (prompt) => (
                        <button
                          key={prompt}
                          onClick={() =>
                            handleQuickPrompt(
                              prompt
                            )
                          }
                          disabled={loading}
                          className="
                            rounded-xl
                            border
                            border-[#D4AF37]/20
                            bg-[#D4AF37]/5
                            px-3 py-2
                            text-left
                            text-xs
                            text-[#f3d58a]
                            transition
                            hover:border-[#D4AF37]/40
                            hover:bg-[#D4AF37]/10
                          "
                        >
                          {prompt}
                        </button>
                      )
                    )}

                  </div>

                </div>
              )}

            {/* ==========================================
                THINKING
            ========================================== */}

            {loading && (
              <div className="mb-4 flex justify-start">

                <div
                  className="
                    flex items-center gap-2
                    rounded-2xl
                    rounded-bl-md
                    border border-white/10
                    bg-[#17131a]
                    px-4 py-3
                    text-sm
                    text-white/50
                  "
                >

                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  GymNance Coach is thinking...

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* ==========================================
              INPUT
          ========================================== */}

          <div
            className="
              border-t border-white/10
              bg-[#0d0b0f]
              p-3
            "
          >

            <div
              className="
                flex items-end gap-2
                rounded-2xl
                border border-white/10
                bg-[#141116]
                p-2
                transition
                focus-within:border-[#D4AF37]/40
              "
            >

              <textarea
                ref={textareaRef}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI Coach anything..."
                rows={1}
                disabled={loading}
                className="
                  max-h-32
                  min-h-[40px]
                  flex-1
                  resize-none
                  bg-transparent
                  px-2 py-2
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/30
                "
              />

              <button
                onClick={() => sendMessage()}
                disabled={
                  !message.trim() ||
                  loading
                }
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-[#D4AF37]
                  text-black
                  transition
                  hover:bg-[#F3D58A]
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="Send message"
              >
                <Send size={18} />
              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-white/25">
              Enter to send • Shift + Enter for a new line
            </p>

          </div>

        </div>
      )}
    </>
  );
}