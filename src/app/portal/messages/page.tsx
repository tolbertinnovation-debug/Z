"use client";

import { useState } from "react";
import {
  Send, Paperclip, Phone, Video, ArrowLeft,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: number;
  from: "me" | "counselor";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  time: string;
  online: boolean;
  messages: Message[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Counselor Sarah",
    role: "Senior Counselor",
    avatar: "CS",
    lastMessage: "Great news about Marwadi scholarship...",
    unread: 4,
    time: "2m ago",
    online: true,
    messages: [
      { id: 1, from: "counselor", text: "Hi Emmanuel! I've reviewed your LPU application. Your profile looks great!", time: "10:02 AM" },
      { id: 2, from: "me", text: "Thank you! Should I prepare additional documents?", time: "10:05 AM" },
      { id: 3, from: "counselor", text: "Yes — upload your WAEC result as soon as possible.", time: "10:08 AM" },
      { id: 4, from: "counselor", text: "Also, great news: Marwadi University has a new scholarship. You qualify!", time: "10:09 AM" },
      { id: 5, from: "me", text: "That's amazing! What's the deadline?", time: "10:12 AM" },
      { id: 6, from: "counselor", text: "March 15. Let's discuss in our session on Jan 25. I'll send you the details.", time: "10:15 AM" },
    ],
  },
  {
    id: 2,
    name: "Counselor James",
    role: "Visa Specialist",
    avatar: "CJ",
    lastMessage: "Your visa documents are...",
    unread: 1,
    time: "1h ago",
    online: true,
    messages: [
      { id: 1, from: "counselor", text: "Hello Emmanuel! I've been assigned to handle your visa application.", time: "9:00 AM" },
      { id: 2, from: "me", text: "Great, thank you James!", time: "9:05 AM" },
      { id: 3, from: "counselor", text: "Your visa documents are ready for the next step. Please book your biometrics appointment soon.", time: "9:30 AM" },
    ],
  },
  {
    id: 3,
    name: "Admission Team",
    role: "Support Team",
    avatar: "AT",
    lastMessage: "Your application has been received",
    unread: 0,
    time: "2d ago",
    online: false,
    messages: [
      { id: 1, from: "counselor", text: "Welcome to Tolbert Innovation Hub, Emmanuel!", time: "Jan 5, 2024" },
      { id: 2, from: "counselor", text: "Your application has been received and is being processed. Our team will review it within 2-3 business days.", time: "Jan 5, 2024" },
    ],
  },
];

const AVATAR_COLORS: Record<string, string> = {
  CS: "from-pink-500 to-rose-600",
  CJ: "from-violet-500 to-indigo-600",
  AT: "from-teal-500 to-cyan-600",
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<number>(1);
  const [showThread, setShowThread] = useState(false);
  const [input, setInput] = useState("");

  const active = CONVERSATIONS.find((c) => c.id === activeId) ?? CONVERSATIONS[0];

  const handleSelect = (id: number) => {
    setActiveId(id);
    setShowThread(true);
  };

  return (
    <div className="h-[calc(100vh-73px)] flex overflow-hidden">
      {/* Conversation List */}
      <div
        className={`w-full sm:w-72 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col ${
          showThread ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Messages</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your counselor conversations</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelect(conv.id)}
              className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                activeId === conv.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[conv.avatar] ?? "from-slate-400 to-slate-600"} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {conv.avatar}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 truncate">{conv.name}</span>
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="shrink-0 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div
        className={`flex-1 flex flex-col bg-slate-50 min-w-0 ${
          showThread ? "flex" : "hidden sm:flex"
        }`}
      >
        {/* Thread Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3.5 flex items-center gap-3">
          <button
            className="sm:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setShowThread(false)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative shrink-0">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_COLORS[active.avatar] ?? "from-slate-400 to-slate-600"} flex items-center justify-center text-white text-xs font-bold`}
            >
              {active.avatar}
            </div>
            {active.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">{active.name}</p>
            <p className="text-xs text-slate-400">{active.online ? "Online" : active.role}</p>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              <Phone className="w-4.5 h-4.5" />
            </button>
            <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
              <Video className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {active.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.from === "me" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.from === "counselor" && (
                <div
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${AVATAR_COLORS[active.avatar] ?? "from-slate-400 to-slate-600"} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                >
                  {active.avatar}
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "me"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 border border-slate-100 rounded-bl-md shadow-sm"
                }`}
              >
                {msg.text}
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    msg.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className={`text-[10px] ${msg.from === "me" ? "text-blue-200" : "text-slate-400"}`}>
                    {msg.time}
                  </span>
                  {msg.from === "me" && <CheckCheck className="w-3 h-3 text-blue-200" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200">
            <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
              <Paperclip className="w-4.5 h-4.5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) setInput(""); }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
            <button
              onClick={() => setInput("")}
              disabled={!input.trim()}
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                input.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
