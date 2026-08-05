"use client";

import { useState, useRef,useEffect } from "react";
import { DeleteIcon, Plus } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function UploadPage() {
  const data = useData();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {products, setProducts} = data;
const [filteredProducts, setFilteredProducts] = useState([]);

const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(true);
const dbImageUrls = new Set(
      products
        .map((p) => p.image)
        .filter(Boolean)
    );
const orphanUrls = [];
  useEffect(() => {
    async function fetchBlobs() {
      const res = await fetch("/api/blobs");
      const data = await res.json();
      setBlobs(data.blobs || []);
     setFilteredProducts(data.blobs.map((blob) => ( dbImageUrls.has(blob.url) ? blob : null)));
    /*  for (const blob of data.blobs) {
        // If the blob URL isn't in your database set, mark it as orphaned
        if (!dbImageUrls.has(blob.url)) {
          orphanUrls.push(blob.url);
          //alert(orphanUrls.length);
        }
      } */
    
      setLoading(false);
    }
    fetchBlobs();
  }, []);

  if (loading) return <div>Loading blobs...</div>;
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

  const getFilename = (url) => {
    return url.split("/").pop();
  }

  const deleteBlob = async (url) => {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    //alert(data.message);
    if (res.ok) {
      setBlobs(blobs.filter((blob) => blob.url !== url));
    }
  }



  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* <input
          className="p-4 rounded-lg bg-white/90 hover:bg-white transition-colors"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        /> */}
        {/**previewUrl ? (
          <img className="w-40 h-40 object-cover rounded-lg" src={previewUrl} alt="Preview" />
        ) : (
          <button onClick={() => fileInputRef.current?.click()} className="p-4 rounded-lg bg-white/90 hover:bg-white transition-colors">
            <Plus size={20} style={{ color: "var(--primary)" }} />
          </button>
        
        /**isUploading && (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Uploading...</p>
        )*/
        /**uploadedUrl && (
          <p className="text-sm break-all max-w-md" style={{ color: "var(--accent)" }}>{uploadedUrl}</p>
        )*/}
      </div>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display', serif" }}>total products: {products.length}</h3>
        <table className="w-full table-auto border ">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">URL</th>
              <th className="px-4 py-2 text-left">Filename</th>
            </tr>
          </thead>
          <tbody>
      {products.map((product) => (
        <tr key={product.id} className="border-b border-gray-200">
          <td className="px-4 py-2">
            <img className="w-10 h-10 object-cover rounded-lg" src={product.image} alt="Preview" />
          </td>
          <td className="px-4 py-2">
            <p className="text-sm break-all max-w-md" style={{ color: "var(--accent)" }}>{product.image}</p>
          </td>
          <td className="px-4 py-2">
            <p className="text-sm break-all max-w-md" style={{ color: "var(--accent)" }}>{getFilename(product.image)}</p>
          </td>
        </tr>
      ))}
      </tbody>
      </table>
      </div>
      <div>
        {loading ? (
          <p>Loading blobs...</p>
        ) : (
         <>
         <p>Count: {blobs.length -1}</p>
         <p>un saved product: {blobs.length-products.length-1}</p>
          <table>
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-10 py-2  text-left">No</th>
                <th className="px-10 py-2  text-left">Image</th>
                <th className="px-10 py-2  text-left">URL</th>
                <th className="px-10 py-2  text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
            {blobs.map((blob,i) => (
             !dbImageUrls.has(blob.url) &&  (
             getFilename(blob.url) ? (
             <tr key={blob.url}>
                <td className="px-2 py-2  text-left">{i+1}</td>
                <td className="px-2 py-4 w-40  text-left">
                  <img
                  src={blob.url}
                  alt={blob.pathname}
                  className="w-20 h-20 object-cover rounded-md"
                />
                </td>
                <td>
                  <p className="text-sm break-all max-w-md" style={{ color: "var(--accent)" }}>{blob.url}</p>
                </td>
                <td>
                  {getFilename(blob.url) ?
                  <button onClick={() => deleteBlob(blob.url)} className="p-4 rounded-lg bg-white/90 hover:bg-white transition-colors">
                    <DeleteIcon size={20} style={{ color: "var(--primary)" }} />
                  </button>
                  :null
                }</td>
              </tr>
            ) : null
            )))}
          </tbody>
          </table>
          </>
        )}
      </div>
    </div>
  );
}
