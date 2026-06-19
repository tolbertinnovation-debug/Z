"use client";

import { useState } from "react";
import { Send, Paperclip, ArrowLeft, Plus, Circle } from "lucide-react";

interface Message {
  id: number;
  sender: "admin" | "student";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  studentName: string;
  studentEmail: string;
  avatarInitials: string;
  avatarColor: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    studentName: "James Kollie",
    studentEmail: "james.kollie@email.com",
    avatarInitials: "JK",
    avatarColor: "bg-orange-500",
    lastMessage: "When will my documents be reviewed?",
    timestamp: "10:42 AM",
    unreadCount: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Hello, I submitted my passport two days ago.",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "admin",
        text: "Hi James! We received your passport. Our team is reviewing it now.",
        time: "10:35 AM",
      },
      {
        id: 3,
        sender: "student",
        text: "When will my documents be reviewed?",
        time: "10:42 AM",
      },
      {
        id: 4,
        sender: "admin",
        text: "Usually within 2–3 business days. You'll receive an email notification.",
        time: "10:45 AM",
      },
    ],
  },
  {
    id: 2,
    studentName: "Mary Flomo",
    studentEmail: "mary.flomo@email.com",
    avatarInitials: "MF",
    avatarColor: "bg-rose-500",
    lastMessage: "Thank you so much!",
    timestamp: "9:15 AM",
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "Hi Mary, your WAEC results have been approved!",
        time: "9:00 AM",
      },
      {
        id: 2,
        sender: "student",
        text: "Oh wonderful! What's the next step?",
        time: "9:10 AM",
      },
      {
        id: 3,
        sender: "admin",
        text: "Please upload your bank statement and transcript next.",
        time: "9:12 AM",
      },
      {
        id: 4,
        sender: "student",
        text: "Thank you so much!",
        time: "9:15 AM",
      },
    ],
  },
  {
    id: 3,
    studentName: "David Togba",
    studentEmail: "david.togba@email.com",
    avatarInitials: "DT",
    avatarColor: "bg-amber-500",
    lastMessage: "I'll resend it right away.",
    timestamp: "Yesterday",
    unreadCount: 1,
    online: false,
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "David, your bank statement appears blurry. Could you resend it?",
        time: "Yesterday 3:00 PM",
      },
      {
        id: 2,
        sender: "student",
        text: "Oh I'm sorry about that.",
        time: "Yesterday 3:30 PM",
      },
      {
        id: 3,
        sender: "student",
        text: "I'll resend it right away.",
        time: "Yesterday 3:31 PM",
      },
    ],
  },
  {
    id: 4,
    studentName: "Sarah Kamara",
    studentEmail: "sarah.kamara@email.com",
    avatarInitials: "SK",
    avatarColor: "bg-red-500",
    lastMessage: "My transcript was rejected — can you explain why?",
    timestamp: "Yesterday",
    unreadCount: 3,
    online: false,
    messages: [
      {
        id: 1,
        sender: "student",
        text: "Hello, I got an email saying my transcript was rejected.",
        time: "Yesterday 1:00 PM",
      },
      {
        id: 2,
        sender: "admin",
        text: "Hi Sarah, the transcript needs an official seal from your institution.",
        time: "Yesterday 1:15 PM",
      },
      {
        id: 3,
        sender: "student",
        text: "I see. I'll get an official copy.",
        time: "Yesterday 1:20 PM",
      },
      {
        id: 4,
        sender: "student",
        text: "My transcript was rejected — can you explain why?",
        time: "Yesterday 2:00 PM",
      },
    ],
  },
  {
    id: 5,
    studentName: "Emmanuel Pewee",
    studentEmail: "e.pewee@email.com",
    avatarInitials: "EP",
    avatarColor: "bg-orange-600",
    lastMessage: "Looking forward to it!",
    timestamp: "Jun 17",
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "Emmanuel, we've scheduled your counseling session for June 22nd at 2 PM.",
        time: "Jun 17 11:00 AM",
      },
      {
        id: 2,
        sender: "student",
        text: "That works for me. What should I prepare?",
        time: "Jun 17 11:30 AM",
      },
      {
        id: 3,
        sender: "admin",
        text: "Please bring your list of preferred universities and any scholarship interests.",
        time: "Jun 17 11:45 AM",
      },
      {
        id: 4,
        sender: "student",
        text: "Looking forward to it!",
        time: "Jun 17 12:00 PM",
      },
    ],
  },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [showThread, setShowThread] = useState(false);

  function selectConversation(conv: Conversation) {
    setSelected(conv);
    setShowThread(true);
  }

  function handleBack() {
    setShowThread(false);
  }

  function handleSend() {
    if (!input.trim()) return;
    setInput("");
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-0 bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Left Panel */}
      <div
        className={`w-full md:w-80 flex-shrink-0 border-r border-slate-200 flex flex-col ${showThread ? "hidden md:flex" : "flex"}`}
      >
        {/* Left Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Messages</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 ${
                selected?.id === conv.id ? "bg-orange-50 border-l-2 border-l-orange-500" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full ${conv.avatarColor} flex items-center justify-center text-white text-sm font-semibold`}
                >
                  {conv.avatarInitials}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800 text-sm truncate">
                    {conv.studentName}
                  </p>
                  <span className="text-xs text-slate-400 flex-shrink-0 ml-1">
                    {conv.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`flex-1 flex flex-col ${showThread ? "flex" : "hidden md:flex"}`}
      >
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <button
                onClick={handleBack}
                className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-full ${selected.avatarColor} flex items-center justify-center text-white text-sm font-semibold`}
                >
                  {selected.avatarInitials}
                </div>
                {selected.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  {selected.studentName}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Circle
                    className={`w-2 h-2 fill-current ${selected.online ? "text-green-400" : "text-slate-300"}`}
                  />
                  {selected.online ? "Online" : "Offline"} ·{" "}
                  {selected.studentEmail}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selected.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === "admin"
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-800 rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "admin" ? "text-orange-100" : "text-slate-400"}`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-200 flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-1">
              Select a conversation
            </h3>
            <p className="text-slate-400 text-sm">
              Choose a student from the list to view the conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
