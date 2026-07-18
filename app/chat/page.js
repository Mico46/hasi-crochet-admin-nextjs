"use client";

import { useState, useRef, useEffect } from "react";
import { useData } from "@/lib/data-context";
import { Search, MessageCircle, Send } from "lucide-react";
import {auth} from '@/lib/firebase';
export default function ChatPage() {
  const data = useData();
  const { messages, setMessages } = data;
  const {conversations,setConversations} = data;
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const currentUserId = auth.currentUser.uid;
  const [conv,setConv] = useState([]);
//const conv = conversations.filter((c)=> c.fi;)
  useEffect(() => {
    if (messages.length > 0 && !active) {
      setActive(messages[0]);
    }
    const con = conversations.filter((c)=> c.participants.includes(currentUserId));
    setConv(con);
  }, [messages, active]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active]);

  function send() {
    if (!input.trim() || !active) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const updated = messages.map((m) =>
      m.id === active.id
        ? { ...m, messages: [...m.messages, { text: input, sender: "admin", time: now }], unread: 0, preview: input, time: now }
        : m
    );
    setMessages(updated);
    setActive(updated.find((m) => m.id === active.id) ?? null);
    setInput("");
  }

  function markRead(id) {
    setMessages(messages.map((m) => (m.id === id ? { ...m, unread: 0 } : m)));
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)]">
      {/* Conversation list */}
       <div className="w-72 shrink-0 rounded-2xl overflow-hidden flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--secondary)" }}>
            <Search size={14} style={{ color: "var(--muted-foreground)" }} />
            <input placeholder="Search conversations..." className="flex-1 bg-transparent outline-none text-xs" style={{ color: "var(--foreground)" }} />
          </div>
        </div>
         <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <p>{conv}</p>
          {messages.map((m) => (
            m.id &&
            <button key={m.id} onClick={() => { setActive(m); markRead(m.id); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{ borderBottom: "1px solid var(--border)", background: active?.id === m.id ? "var(--secondary)" : undefined }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{m.customer}</p>
                  <p className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{m.time}</p>
                </div>
                <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{m.preview}</p>
              </div>
              {m.unread > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  {m.unread}
                </span>
              )}
            </button> 
           
         ))}
        
          {/* {conversations.map((conversation) => ( */}
            
       
            
         
        </div> 
      </div> 

      {/* Chat window */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {!active ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <MessageCircle size={40} style={{ color: "var(--muted-foreground)", opacity: 0.3 }} />
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Select a conversation</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {active.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{active.customer}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Customer</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
              {active.messages?.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.sender === "admin" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.sender === "customer" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 self-end" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                      {active.avatar}
                    </div>
                  )}
                  <div className="max-w-[70%]">
                    <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={msg.sender === "admin"
                        ? { background: "var(--primary)", color: "var(--primary-foreground)", borderBottomRightRadius: 4 }
                        : { background: "var(--secondary)", color: "var(--foreground)", borderBottomLeftRadius: 4 }}>
                      {msg.text}
                    </div>
                    <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-right" : "text-left"}`} style={{ color: "var(--muted-foreground)" }}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: "var(--secondary)" }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Reply to customer..." className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--foreground)" }} />
              </div>
              <button onClick={send} disabled={!input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{ background: input.trim() ? "var(--primary)" : "var(--muted)", color: input.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
