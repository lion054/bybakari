import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { SITE } from "@/lib/site-config";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Mhoro! I'm Bakari's AI stylist. Ask me about the MOSI print, sizing, or what to wear — or tell me the occasion and I'll suggest pieces.",
};

/** Turns /shop/<id> paths in assistant text into product links. */
function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(\/shop\/\d+)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = /^\/shop\/(\d+)$/.exec(part);
        if (match) {
          return (
            <Link
              key={i}
              to="/shop/$productId"
              params={{ productId: match[1] }}
              className="underline font-semibold hover:opacity-70"
            >
              view piece →
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/** Renders assistant text with **bold** markdown and product links. */
function MessageText({ text }: { text: string }) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i}>
            <LinkifiedText text={part} />
          </strong>
        ) : (
          <LinkifiedText key={i} text={part} />
        ),
      )}
    </>
  );
}

export function FabChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The welcome message is client-side only — don't send it as history.
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
      } else if (data.error === "unconfigured") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "The AI stylist isn't available right now — but the studio is one tap away on WhatsApp below and will happily help you directly.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I hit a snag — please try again in a moment, or reach the studio on WhatsApp below.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't connect — check your network, or message the studio on WhatsApp below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] flex flex-col bg-background text-foreground rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-black text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <div>
                <p className="text-sm font-semibold leading-none">Bakari's AI Stylist</p>
                <p className="text-[10px] opacity-60 mt-1 font-mono uppercase tracking-widest">
                  #byBakari
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 hover:opacity-70"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-48">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-black text-white rounded-br-sm"
                    : "mr-auto bg-foreground/5 rounded-bl-sm"
                }`}
              >
                <MessageText text={m.content} />
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-foreground/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
              </div>
            )}
          </div>

          <div className="border-t border-foreground/10 p-3 space-y-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about pieces, sizes, styling…"
                className="flex-1 bg-foreground/5 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="bg-black text-white rounded-full p-2.5 disabled:opacity-40 hover:bg-black/85 transition"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-green-700 hover:text-green-800 py-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Prefer a human? Chat with the studio on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 bg-black hover:bg-black/85 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        aria-label={open ? "Close stylist chat" : "Chat with Bakari's AI stylist"}
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>
    </>
  );
}
