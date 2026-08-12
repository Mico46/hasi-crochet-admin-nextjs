// app/delete-account/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export default function DeleteAccountPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
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
      const userDocRef = doc(db, "users", user.uid);
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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h1>

      <p className="text-gray-600 mb-6">
        Deleting your account will remove your user profile and all personal data stored in <strong>H Crochet</strong>. This process is immediate and irreversible.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 transition-colors"
      >
        {loading ? "Deleting..." : "Permanently Delete My Account"}
      </button>
    </div>
  );
}