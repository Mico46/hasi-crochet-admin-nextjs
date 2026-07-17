"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { Plus } from "lucide-react";

export default function UploadPage() {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedBlob, setUploadedBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
event.preventDefault();
    const file = fileInputRef.current.files?.[0];
    //event.target.files?.[0];
   /*  if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
      setUploadedBlob(null);
      setIsUploading(true); */
      try {
       /*  const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/uploads",
        }); */
        const response = await fetch(
            `/api/uploads?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );
 
          const newBlob = await response.json();

        setUploadedBlob(newBlob);
      } catch (error) {
        alert("Error: " + error);
      } finally {
        setIsUploading(false);
      }
   // }
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
        {uploadedBlob && <p className="text-sm break-all" style={{ color: "var(--foreground)" }}>{uploadedBlob.url}</p>}
      </div>
    </div>
  );
}
