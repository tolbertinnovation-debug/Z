"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const quickReplies = [
  "University info",
  "Scholarship help",
  "Application status",
  "Visa guidance",
];

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("university") || lower.includes("universities") || lower.includes("school")) {
    return "We have 17 partner universities across India and North Cyprus! You can browse all of them at our Universities page. Would you like me to help you find a specific program?";
  }
  if (lower.includes("scholarship") || lower.includes("fund") || lower.includes("financial")) {
    return "Great news! We offer scholarships of up to 80% tuition waiver at our partner universities. Scholarships are available for merit, sports, and need-based criteria. Check out our Scholarship Finder tool!";
  }
  if (lower.includes("application") || lower.includes("apply") || lower.includes("status")) {
    return "You can track your application status in the Student Dashboard. If you haven't applied yet, visit our Apply page to get started. Need help with your application?";
  }
  if (lower.includes("visa") || lower.includes("travel") || lower.includes("passport")) {
    return "We provide complete visa guidance for both India and North Cyprus student visas. Our counselors will walk you through the documentation and process. Would you like to book a counseling session?";
  }
  if (lower.includes("counsel") || lower.includes("advisor") || lower.includes("help")) {
    return "Our dedicated Liberian counselors are available for one-on-one sessions. You can book a free counseling session on our Counseling page. Sessions are available via Zoom!";
  }
  if (lower.includes("cost") || lower.includes("fee") || lower.includes("tuition") || lower.includes("price")) {
    return "Tuition fees range from $1,000 to $10,000 per year depending on the university and program. With scholarships, many students pay much less. Use our Compare tool to compare costs side by side!";
  }
  return "Thank you for your message! Our team will get back to you shortly. You can also explore our website for information about universities, scholarships, and the application process. Is there anything specific I can help you with?";
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! Welcome to Tolbert Innovation Hub. How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && !isMinimized && (
        <div
          className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  TH
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Live Support</p>
                <p className="text-blue-200 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-slate-700 shadow-sm rounded-bl-md"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1">
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="shrink-0 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-2 hover:shadow-2xl transition-shadow"
        >
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-slate-700">Live Support</span>
          <div className="w-2 h-2 bg-green-400 rounded-full" />
        </button>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform relative"
        aria-label="Open live chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold leading-none">1</span>
          </div>
        )}
      </button>
    </div>
  );
}
