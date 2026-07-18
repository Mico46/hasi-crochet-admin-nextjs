"use client";

import { useState, useRef } from "react";
import { collection, addDoc, updateDoc, doc, setDoc,deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useData } from "@/lib/data-context";  
import { Search, Plus, Edit2, Trash2, Star, X,Eye } from "lucide-react";
import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";

function ProductModal({ product, onSave, onClose, disable }) {
  const [form, setForm] = useState({
    id: product?.id ?? null,
    name: product?.name ?? "",
    category: product?.category ?? "Bags",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? "",
    image: product?.image ?? "",
    colors: product?.colors?.join(", ") ?? "",
    sellerName: product?.sellerName ?? "",
    
  });

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedBlob, setUploadedBlob] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
      setUploadedBlob(null);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Upload failed");
        setForm((prev) => ({ ...prev, image: data.url }));
        setUploadedBlob(data);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const cats = ["Bags", "Clothing", "Home", "Decor", "Accessories", "Supplies"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg rounded-3xl overflow-hidden max-h-[90vh] flex flex-col" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ background: "var(--secondary)" }}>
            <X size={16} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
          {form.image && (
            <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-2xl" />
          )}
          <Field label="Product Name">
          <p>{"Product ID:" +form.id}</p>
            <input disabled={disable} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Chunky Knit Tote Bag" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select disabled={disable} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                {cats.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (Birr)">
              <input disabled={disable} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
            </Field>
          </div>
          <Field label="Stock Quantity">
            <input disabled={disable} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
          </Field>
          <Field label="Image URL">
            {!form.image ? disable ? null : (
              <Input className="w-1/2" type="file" ref={fileInputRef} onChange={handleFileChange} placeholder="File" />
            ) : (
              <div className="flex items-center gap-2">
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder={form.image} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
                <Button onClick={() => { setForm((prev) => ({ ...prev, image: "" })); setPreviewUrl(""); }} className="mt-2">Remove</Button>
              </div>
            )}
          </Field>
          <Field label="Colors (comma-separated)">
            <input disabled={disable} value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })}
              placeholder="Natural, Dusty Rose, Sage" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
          </Field>
          <Field label="Description">
            <textarea disabled={disable} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3} placeholder="Describe this handmade item..."
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
          </Field>
          <Field label="Seller name">
            <input disabled={disable} value={form.sellerName} onChange={(e) => setForm({ ...form, sellerName: e.target.value })} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "var(--secondary)", color: "var(--foreground)" }} placeholder="Seller name" />
          </Field>
        </div>
        <div className="px-6 py-4 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
            Cancel
          </button>
          <button
            onClick={() => !disable && onSave({ ...form, colors: form.colors.split(",").map((s) => s.trim()) })}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
            {product ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const data = useData();
  const { products, setProducts } = data;
  const { user, setUser } = data;
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const cats = ["All", "Bags", "Clothing", "Home", "Decor", "Supplies"];
  const filtered = products.filter((p) => {
    const mCat = catFilter === "All" || p.category === catFilter;
    const mSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return mCat && mSearch;
  });
  const currentUser = user.find((u) => u.email === auth.currentUser.email);

  async function deleteProduct(id) {
    if (!id) return alert("Product ID is required to delete a product.");
 
  const result = confirm("Are you sure you want to delete this product?");
  if(result){
    const docRef = doc(db, "products", id)
    await deleteDoc(docRef);
  }else{
    return;
  }

  }

  async function toggleActive(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      await updateDoc(doc(db, "products", id), { active: !product.active });
    }
  }

  async function saveProduct(formData) {
    if (modal === "add") {
      const docref = doc(collection(db, "products"));
      formData.id = docref.id;
      alert(formData.id +"  the form data is"+formData.name);
      await setDoc(docref, {
        ...formData,
        rating: 5,
        reviews: 0,
        isActive: true,
        inStock: true,
        isFeatured: true,
        isNew: true,
        sellerId: currentUser.id,
        sellerName: currentUser.name,

        
        createdAt: new Date().toISOString().split("T")[0],
      });
    } else if (modal && typeof modal === "object") {
      if (formData.id) {
        await setDoc(doc(db, "products", formData.id), formData, { merge: true });
      } else {
        alert("Product ID is required to update a product.");
      }
    }
    setModal(null);
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-48 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <Search size={15} style={{ color: "var(--muted-foreground)" }} />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--foreground)" }} />
        </div>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={catFilter === c ? { background: "var(--primary)", color: "var(--primary-foreground)" } : { background: "var(--card)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setModal("add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          
          <div key={p.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p>{p.id}</p>
            <div className="relative" style={{ height: 180 }}>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
              {!p.isActive && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">Inactive</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button onClick={() => setViewProduct(p)} className="p-1.5 rounded-lg bg-white/90 hover:bg-white transition-colors">
                  <Eye size={13} style={{ color: "var(--foreground)" }} />
                </button>
                <button onClick={() => setModal(p)} className="p-1.5 rounded-lg bg-white/90 hover:bg-white transition-colors">
                  <Edit2 size={13} style={{ color: "var(--foreground)" }} />
                </button>
                <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg bg-white/90 hover:bg-white transition-colors">
                  <Trash2 size={13} style={{ color: "#dc2626" }} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.9)", color: "var(--foreground)" }}>
                  {p.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-semibold leading-snug flex-1 pr-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>{p.name}</p>
                <p className="text-sm font-bold shrink-0" style={{ color: "var(--primary)" }}>Br -{p.price}</p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={11} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.rating} ({p.reviews})</span>
                </div>
                <span className="text-xs font-medium" style={{ color: p.stock === 0 ? "#dc2626" : p.stock < 5 ? "#d97706" : "var(--accent)" }}>
                  {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {p.colors?.slice(0, 3).map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}>{c}</span>
                  ))}
                </div>
                <button onClick={() => toggleActive(p.id)}
                  className="text-xs font-medium px-2.5 py-1 rounded-full transition-all"
                  style={p.isActive ? { background: "#dcfce7", color: "#16a34a" } : { background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  {p.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <ProductModal
          product={modal === "add" ? null : modal}
          onSave={saveProduct}
          onClose={() => setModal(null)}
          disalbe = {false}
        />
      )}
      {viewProduct && (
        <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} disable={true} />
      )}
    </div>
  );
}
