"use client";

import { useState, useRef, useEffect } from "react";
import { useData } from "@/lib/data-context";
import { Search, MessageCircle, Send, ChevronLeft } from "lucide-react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";


const formatDate = (timestamp) => {
  if (!timestamp) return "Today";
  
  // If it's a Firestore Timestamp, convert it to a JS Date first
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  });
};

export default function ChatPage() {
  const data = useData();
  const { messages, setMessages,conversations, setConversations,conversationsUser } = data;
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const[conv,setConv] = useState([]);
  const currentUserId = auth.currentUser?.uid;
  useEffect(() => {
    if (messages.length > 0 && !active) {
     // setActive(messages[0]);
    }
  }, [messages, active]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if(conversationsUser.length > 0 && !active){
     // alert(conversationsUser[0].participantNames[currentUserId]);
      setConv(conversationsUser);
    }
    
  }, [conversationsUser]);

  async function send() {
    if (!input.trim() || !active) return;
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const timestamp = new Date();
    const lastSenderId = currentUserId;
    const lastMessage = input;
    const senderName = active.participantNames[currentUserId];
const senderId = currentUserId;
    const docId = active.id;
    const messageData = {
      'senderId': senderId,
      'senderName': senderName,
      'text': lastMessage,
      'time': time,
      'timestamp': timestamp,
    };
    try{
    const docRef = doc(db, "conversations", docId);
    await updateDoc(docRef,{
        'messages': active.messages.concat(messageData),
        'lastMessage': lastMessage,
        'lastMessageTime': timestamp,
        'lastSenderId': senderId,
      }); 
     // const updated = active.messages.concat(messageData);

      /* .map((m) =>
        m.id === active.id
          ? { ...m, lastMessage: input, lastMessageTime: timestamp, lastSenderId: senderId }
          : m
      ); */
      /* alert(JSON.stringify(active.map((m)=>
        m.id === active.id ? { ...m, messages: updated } : m
      ))); */
      //setActive(updated);
    setInput("");
    }
    catch(error){
      alert(error);
    }
    
    /* const updated = messages.map((m) =>
      m.id === active.id
        ? { ...m, messages: [...m.messages, { text: input, sender: "admin", time: now }], unread: 0, preview: input, time: now }
        : m
    );
    setMessages(updated);
    setActive(updated.find((m) => m.id === active.id) ?? null);
    setInput(""); */
  }

  function markRead(id) {
    setMessages(messages.map((m) => (m.id === id ? { ...m, unread: 0 } : m)));
  }

  function selectConversation(m) {

    setActive(m);
    markRead(m.id);
  }

  async function deleteConversation(docId){
    const docRef = doc(db, "messages", docId);
    await deleteDoc(docRef);
    const updatedMessages = messages.filter((m) => m.docId !== docId);
    setMessages(updatedMessages);
    if (active?.docId === docId) {
      setActive(null);
  }
  }

  const groupedMessages = active?.messages ? active.messages.reduce((groups, msg) => {
    const dateStr = formatDate(msg.timestamp); // Make sure 'createdAt' matches your Firestore field name!
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(msg);
    return groups;
  }, {}) : {};
  

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)]">
      {/* Conversation list - hidden on mobile when chat is open */}
      <div
        className={`w-full md:w-72 md:shrink-0 rounded-2xl overflow-hidden flex flex-col ${active ? "hidden md:flex" : "flex"}`}
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--secondary)" }}>
            <Search size={14} style={{ color: "var(--muted-foreground)" }} />
            <input placeholder="Search conversations..." className="flex-1 bg-transparent outline-none text-xs" style={{ color: "var(--foreground)" }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {/* messages.map((m) => (
            
            <button
              key={m.docId}
              onClick={() => selectConversation(m)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{ borderBottom: "1px solid var(--border)", background: active?.id === m.id ? "var(--secondary)" : undefined }}
            >
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
          )) */}
          <p>Conversations:</p>
          {conversationsUser.map((m) => (
           
            <button
              key={m.docId}
              onClick={() => selectConversation(m)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{ borderBottom: "1px solid var(--border)", background: active?.id === m.id ? "var(--secondary)" : undefined }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {m.participantNames[Object.keys(m.participantNames).find((key) => key !== currentUserId)][0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{m.participantNames[Object.keys(m.participantNames).find((key) => key !== currentUserId)]}</p>
                  <p className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{
                m.lastMessageTime.toDate().toLocaleString("en-us",{day:"2-digit",month:"2-digit",year:"2-digit"}) == new Date().toLocaleString("en-us",{day:"2-digit",month:"2-digit",year:"2-digit"}) ?
                  m.lastMessageTime.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) :
                  m.lastMessageTime.toDate().toLocaleString("en-us",{day:"2-digit",month:"2-digit",year:"2-digit"})
                  }</p>
                </div>
                <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{m.lastMessage}</p>
              </div>
              
              </button>
          ))
            }
        </div>
      </div>

      {/* Chat window - full width on mobile when active */}
      <div
        className={`flex-1 flex flex-col rounded-2xl overflow-hidden ${!active ? "hidden md:flex" : "flex"}`}
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {!active ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <MessageCircle size={40} style={{ color: "var(--muted-foreground)", opacity: 0.3 }} />
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Select a conversation</p>
          </div>
        ) : (
          <>
            {/* Header with back button on mobile */}
            <div className="flex items-center gap-3 px-3 md:px-5 py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setActive(null)}
                className="md:hidden p-1.5 rounded-lg shrink-0"
                style={{ background: "var(--secondary)" }}
              >
                <ChevronLeft size={18} style={{ color: "var(--foreground)" }} />
              </button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {active.participantNames[Object.keys(active.participantNames).find((key) => key !== currentUserId)][0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{active.participantNames[Object.keys(active.participantNames).find((key) => key !== currentUserId)]}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Online</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
              {/* active.messages?.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.senderId === currentUserId ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.senderId !== currentUserId && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 self-end" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                      {active.participantNames[Object.keys(active.participantNames).find((key) => key !== currentUserId)][0].toUpperCase()}
                    </div>
                  )}
                  <div className="max-w-[80%] md:max-w-[70%]">
                    <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={msg.senderId === currentUserId
                        ? { background: "var(--primary)", color: "var(--primary-foreground)", borderBottomRightRadius: 4 }
                        : { background: "var(--secondary)", color: "var(--foreground)", borderBottomLeftRadius: 4 }}>
                      {msg.text}
                    </div>
                    <p className={`text-xs mt-1 ${msg.senderId === currentUserId ? "text-right" : "text-left"}`} style={{ color: "var(--muted-foreground)" }}>
                      {msg.time}
                    </p>
                  </div>
                 
                </div>
              )) */}
              {Object.keys(groupedMessages).map((date) => (
                <div key={date} className="chat-container">
  <div className="date-separator text-center my-4 text-muted small">
          {date == new Date().toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "2-digit" }) ? "Today" : date}
        </div>
        {groupedMessages[date].map((msg,i) => (
          <div key={i} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl text-sm mb-2 ${msg.senderId === currentUserId ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
              {msg.text}
              <span className="block text-xs mt-1 opacity-80 text-right">
                {new Date(msg.timestamp.toMillis()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
      </div>


              ))
                }
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex-1 flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-2xl" style={{ background: "var(--secondary)" }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Reply..." className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--foreground)" }} />
              </div>
              <button onClick={send} disabled={!input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
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
