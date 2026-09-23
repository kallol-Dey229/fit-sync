"use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

const suggestions = [
  "What classes are best for beginners?",
  "Who are the best trainers?",
  "How does FitSync work?",
];

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I can help you find classes, choose a trainer, or learn how FitSync works.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event) => {
    event?.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    setMessage("");
    setMessages((current) => [...current, { role: "user", content: trimmedMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const result = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.ok ? result.answer : result.error || "I could not answer that right now.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "I could not connect right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section className="flex h-[min(620px,calc(100vh-6.5rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#111116] text-white shadow-2xl shadow-black/50">
          <div className="flex shrink-0 items-center justify-between border-b border-[#ff5a1f]/30 bg-[#ff5a1f] px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20">
                <Bot size={19} />
              </span>
              <div>
                <h2 className="text-sm font-black text-white">FitSync Assistant</h2>
                <p className="flex items-center gap-1 text-[10px] text-white/80">
                  <span className="size-1.5 rounded-full bg-emerald-300" /> Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Close FitSync Assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[#f7f8fa] p-4 text-[#17202d]">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  item.role === "user"
                    ? "self-end rounded-br-sm bg-[#ff5a1f] text-white"
                    : "self-start rounded-bl-sm border border-gray-200 bg-white text-[#334155] shadow-sm"
                }`}
              >
                {item.content}
              </div>
            ))}
            {isLoading && (
              <div className="self-start rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                Thinking...
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex shrink-0 flex-wrap gap-2 border-t border-gray-200 bg-[#f7f8fa] px-4 pb-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-left text-[11px] text-gray-600 transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={sendMessage} className="flex shrink-0 gap-2 border-t border-gray-200 bg-white p-3">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about classes or trainers..."
              maxLength={500}
              className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#ff5a1f]"
              aria-label="Message FitSync Assistant"
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ff5a1f] text-white transition-colors hover:bg-[#e04f1a] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-14 place-items-center rounded-full bg-[#ff5a1f] text-white shadow-lg shadow-[#ff5a1f]/30 transition-transform hover:scale-105 sm:size-16"
        aria-label={isOpen ? "Close FitSync Assistant" : "Open FitSync Assistant"}
      >
        {isOpen ? <X size={22} /> : <Bot size={23} />}
      </button>
    </div>
  );
}