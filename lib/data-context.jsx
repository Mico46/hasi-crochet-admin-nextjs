"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db,auth } from "@/lib/firebase";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user,setUser] =useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const ordUnsub = onSnapshot(collection(db, "orders"), (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const msgUnsub = onSnapshot(collection(db, "messages"), (snap) => {
      setMessages(snap.docs.map((d) => ({ docId: d.id, ...d.data() })));
    });
    const userUnsub = onSnapshot(collection(db, "users"), (snap) => {
      setUser(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const conversations = onSnapshot(collection(db, "conversations"), (snap) => {
      setConversations(snap.docs.map((d) => ({ id: d.id,docId:d.id, ...d.data() })));
    });

    return () => {
      unsub();
      ordUnsub();
      msgUnsub();
      userUnsub();
      conversations();  
    };
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const totalUnread = messages.reduce((s, m) => s + m.unread, 0);
  const currentUserId = auth.currentUser?.uid;
  const conversationsUser = conversations.filter((c) => c.participants.includes(currentUserId));
  //console.log(currentUserId);
  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        orders,
        setOrders,
        messages,
        setMessages,
        totalRevenue,
        pendingCount,
        totalUnread,
        user,
        setUser,
        conversations,
        setConversations,
        conversationsUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
