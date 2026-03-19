import { useState, useRef, useEffect, type ReactNode } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Bot, User, Loader2, Sparkles, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Initialize the Gemini API client
// Note: Fallback to an empty string to prevent crashing if the key is not set yet.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/** Parse text and render markdown tables + bullets */
function renderModelMessage(text: string) {
  const lines = text.split("\n");
  const parts: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Check for markdown table row (starts with | and contains multiple |)
    if (line.trim().startsWith("|") && (line.match(/\|/g)?.length ?? 0) >= 2) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const row = lines[i]
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        // Skip separator row (|---|---|)
        if (!row.every((c) => /^\-+$/.test(c))) {
          tableRows.push(row);
        }
        i++;
      }
      if (tableRows.length > 0) {
        const [header, ...body] = tableRows;
        parts.push(
          <div key={parts.length} className="overflow-x-auto my-2 -mx-1">
            <table className="w-full text-xs border-collapse min-w-[200px]">
              <thead>
                <tr>
                  {header?.map((cell, j) => (
                    <th key={j} className="border border-border/60 bg-muted/50 px-2 py-1.5 text-left font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="border border-border/60 px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    const trimmed = line.trimStart();
    const isBullet = /^[\-\*•]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed);
    const content = isBullet ? trimmed.replace(/^[\-\*•]\s+/, "").replace(/^\d+\.\s+/, "") : line;
    parts.push(
      isBullet ? (
        <div key={parts.length} className="flex gap-2">
          <span className="text-primary shrink-0">•</span>
          <span>{content}</span>
        </div>
      ) : (
        <div key={parts.length}>{line || " "}</div>
      )
    );
    i++;
  }

  return <div className="space-y-0.5">{parts}</div>;
}

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi! I'm your NearNest AI Assistant. I can help you find areas, check commute options, and answer questions about Bangalore rentals. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!API_KEY) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        { 
          role: "model", 
          text: "⚠️ Google Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file." 
        },
      ]);
      setInput("");
      return;
    }

    const currentInput = input;
    setMessages((prev) => [...prev, { role: "user", text: currentInput }]);
    setInput("");
    setIsLoading(true);

    try {
      // Reverting to the highly-available 'gemini-flash-latest' model due to strict free-tier limits on 2.0.
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      
      // We pass some implicit context here by prepending a system message to the prompt,
      // ensuring the bot acts as a real estate assistant for Bangalore.
      const promptContext = "You are a helpful and polite real estate AI assistant for 'NearNest', an AI home matchmaker website in Bangalore, India for working professionals. IMPORTANT: Always format your answers as MARKDOWN TABLES when comparing areas, properties, commute options, rent ranges, or any multi-column data. Use this format: | Column1 | Column2 | Column3 | followed by |---| ---| ---| (separator) then data rows. For simple lists use bullet points (-). Never use long paragraphs - use tables or bullets. Answer this user prompt: ";
      
      const result = await model.generateContent(promptContext + currentInput);
      const responseText = result.response.text();

      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error: any) {
      console.error("Gemini AI Error:", error);
      const isQuotaError = error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("exceeded");
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          text: isQuotaError 
            ? "⚠️ Whoops! Your Google API Key just hit a free-tier limit or quota restriction. Please try again in a minute, or check your Google AI Studio billing dashboard."
            : "Sorry, I ran into an error connecting to the AI brain. Please try again later." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chatbot Window - shown when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col w-[350px] md:w-[400px] h-[500px] bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header with Close Button */}
            <div className="bg-primary/10 px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    Ask NearNest AI
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-muted shrink-0"
                aria-label="Close chatbot"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "user" ? "bg-muted" : "bg-primary/20"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4 text-muted-foreground" /> : <Bot className="w-5 h-5 text-primary" />}
            </div>
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
              msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-tr-sm" 
                : "bg-muted/50 text-foreground border border-border/50 rounded-tl-sm"
            }`}>
              {msg.role === "model" ? (
                renderModelMessage(msg.text)
              ) : (
                msg.text
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-muted/50 border border-border/50">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 bg-card border-t border-border">
        <form onSubmit={handleSend} className="relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about areas, commute, rent..."
            className="pr-12 h-11 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="absolute right-1 w-9 h-9 rounded-full text-primary hover:text-primary hover:bg-primary/20"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Icon - shown when closed */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open chatbot"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>
      )}
    </div>
  );
}
