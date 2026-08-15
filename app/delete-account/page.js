// app/delete-account/page.js
"use client";


import { useRouter } from "next/navigation";

import { deleteUser } from "firebase/auth";
import {  db } from "@/lib/firebase";
import { useState, useRef,useEffect } from "react";
import { collection, addDoc, updateDoc, doc, setDoc,deleteDoc,getDoc } from "firebase/firestore";

import { useData } from "@/lib/data-context";  
import { Search, Plus, Edit2, Trash2, Star, X,Eye } from "lucide-react";
import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";

export default function DeleteAccountPage() {
     const data = useData();
  
  const { user, setUser } = data;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userFound,setUserFound] = useState(false);
  const router = useRouter();
  const users = auth.currentUser;

const { login } = useAuth();
  const handleDeleteAccount = async () => {
    

    if (!users) {
      setError("No user is currently signed in.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account and all associated data? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Delete Firestore user document
      const userDocRef = doc(db, "users", users.uid);
      await deleteDoc(userDocRef);

      // 2. Delete Firebase Auth account
      await deleteUser(user);

      // 3. Redirect after successful deletion
      router.push("/?message=account-deleted");
    } catch (err) {
      console.error("Account deletion failed:", err);

      // Handle re-authentication requirement from Firebase
      if (err.code === "auth/requires-recent-login") {
        setError(
          "For security reasons, you must log out and sign back in before deleting your account."
        );
      } else {
        setError(err.message || "An error occurred while deleting your account.");
      }
    } finally {
      setLoading(false);
    }
  };
  const checkAccount = async()=>{
    
    await login(email, password);
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      alert("Account found");
    } else {
      alert("Account not found");
    }
  }
 /*  useEffect(() => {
    checkAccount();
  }, []); */

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h1>

      <p className="text-gray-600 mb-6">
        Deleting your account will remove your user profile and all personal data stored in <strong>H Crochet</strong>. This process is immediate and irreversible.
      </p>
      <div className="mb-4">
        <Field label={"Email:"}> </Field>
      <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      </div>
      
        <div className="mb-4">
          <Field label={"Password:"}> </Field>
          <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
       <Button onClick={()=>checkAccount()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 transition-colors">Login</Button>
{user ? <p>{user.name}</p> : <p>user not found</p>}
<button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 transition-colors"
      >
        {loading ? "Deleting..." : "Permanently Delete My Account"}
      </button>:
     
      
      
    </div>
  );
}