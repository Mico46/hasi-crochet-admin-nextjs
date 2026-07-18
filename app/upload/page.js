"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";

export default function UploadPage() {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploadedUrl("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url);
    } catch (error) {
      alert("Upload error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="p-4 rounded-lg bg-white/90 hover:bg-white transition-colors"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {previewUrl ? (
          <img className="w-40 h-40 object-cover rounded-lg" src={previewUrl} alt="Preview" />
        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="p-4 rounded-lg bg-white/90 hover:bg-white transition-colors">
            <Plus size={20} style={{ color: "var(--primary)" }} />
          </button>
        )}
        {isUploading && (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Uploading...</p>
        )}
        {uploadedUrl && (
          <p className="text-sm break-all max-w-md" style={{ color: "var(--accent)" }}>{uploadedUrl}</p>
        )}
      </div>
    </div>
  );
}
