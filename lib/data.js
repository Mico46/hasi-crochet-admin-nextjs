export const seedProducts = [
  { id: "p1", name: "Chunky Knit Tote Bag", category: "Bags", price: 45, stock: 12, image: "https://images.unsplash.com/photo-1686285961015-12886f9b3bf5?w=300&h=300&fit=crop&auto=format", colors: ["Natural", "Dusty Rose", "Sage"], description: "Handcrafted chunky crochet tote bag.", rating: 4.9, reviews: 48, active: true, createdAt: "2026-06-01" },
  { id: "p2", name: "Crochet Flower Bouquet", category: "Decor", price: 28, stock: 8, image: "https://images.unsplash.com/photo-1700171518313-5dd219beaaa6?w=300&h=300&fit=crop&auto=format", colors: ["Multicolor", "Pastel", "Bold"], description: "Forever-blooming hand-crocheted flower bouquet.", rating: 5.0, reviews: 32, active: true, createdAt: "2026-06-10" },
  { id: "p3", name: "Granny Square Blanket", category: "Home", price: 85, stock: 5, image: "https://images.unsplash.com/photo-1728393287642-13bee7126ae8?w=300&h=300&fit=crop&auto=format", colors: ["Cream", "Grey", "Terracotta"], description: "Generously sized crochet throw blanket.", rating: 4.8, reviews: 61, active: true, createdAt: "2026-05-20" },
  { id: "p4", name: "Market Basket Bag", category: "Bags", price: 52, stock: 3, image: "https://images.unsplash.com/photo-1594638963668-52eb9798e8ca?w=300&h=300&fit=crop&auto=format", colors: ["Natural", "Tan", "White"], description: "Sturdy handwoven market basket.", rating: 4.7, reviews: 29, active: true, createdAt: "2026-06-15" },
  { id: "p5", name: "Chunky Knit Sweater", category: "Clothing", price: 120, stock: 7, image: "https://images.unsplash.com/photo-1641642231157-0849081598a2?w=300&h=300&fit=crop&auto=format", colors: ["Oat", "Charcoal", "Clay"], description: "Luxuriously soft hand-crocheted oversized sweater.", rating: 4.9, reviews: 22, active: true, createdAt: "2026-06-03" },
  { id: "p6", name: "Mini Plant Pot Covers", category: "Home", price: 14, stock: 22, image: "https://images.unsplash.com/photo-1659520709425-31b547254b59?w=300&h=300&fit=crop&auto=format", colors: ["Terracotta", "Sage", "Cream"], description: "Set of 3 crocheted pot covers.", rating: 4.5, reviews: 41, active: true, createdAt: "2026-06-18" },
  { id: "p7", name: "Crochet Pink Shoulder Bag", category: "Bags", price: 58, stock: 0, image: "https://images.unsplash.com/photo-1686285961020-4c46c9f3f7a6?w=300&h=300&fit=crop&auto=format", colors: ["Blush", "White", "Beige"], description: "Charming hand-crocheted shoulder bag.", rating: 4.8, reviews: 19, active: false, createdAt: "2026-06-20" },
  { id: "p8", name: "Colorful Yarn Bundle", category: "Supplies", price: 18, stock: 30, image: "https://images.unsplash.com/photo-1595341595379-cf1cb694ea1f?w=300&h=300&fit=crop&auto=format", colors: ["Autumn", "Ocean", "Garden"], description: "Premium hand-dyed yarn bundle, 5 skeins.", rating: 4.6, reviews: 14, active: true, createdAt: "2026-05-28" },
];

export const seedMessages = [
  { id: "m1", customer: "Liya Haile", avatar: "LH", preview: "Is my order still on time?", unread: 2, time: "10:32 AM", messages: [{ text: "Hi! I placed an order yesterday. Is it still on time?", sender: "customer", time: "10:30 AM" }, { text: "Is my order still on time?", sender: "customer", time: "10:32 AM" }] },
  { id: "m2", customer: "Sara Bekele", avatar: "SB", preview: "Can I get a custom size for the sweater?", unread: 1, time: "9:14 AM", messages: [{ text: "Hello! I love the chunky sweater. Can I order a custom size?", sender: "customer", time: "9:14 AM" }] },
  { id: "m3", customer: "Tigist Alemu", avatar: "TA", preview: "Thank you so much, it arrived!", unread: 0, time: "Yesterday", messages: [{ text: "My blanket just arrived! It is absolutely beautiful", sender: "customer", time: "Yesterday 3:00 PM" }, { text: "So glad you love it! Thank you for your order!", sender: "admin", time: "Yesterday 3:15 PM" }, { text: "Thank you so much, it arrived!", sender: "customer", time: "Yesterday 3:20 PM" }] },
  { id: "m4", customer: "Meron Tadesse", avatar: "MT", preview: "Do you ship internationally?", unread: 0, time: "Jun 29", messages: [{ text: "Do you ship internationally? I have a friend in Germany who wants one.", sender: "customer", time: "Jun 29" }, { text: "We currently ship within Ethiopia, but international shipping is coming soon!", sender: "admin", time: "Jun 29" }] },
];

export const salesData = [
  { month: "Feb", sales: 420 }, { month: "Mar", sales: 680 }, { month: "Apr", sales: 540 },
  { month: "May", sales: 890 }, { month: "Jun", sales: 1120 }, { month: "Jul", sales: 760 },
];

export const categoryData = [
  { name: "Bags", value: 38, color: "#8c4b2f" },
  { name: "Clothing", value: 22, color: "#5c7a5a" },
  { name: "Home", value: 20, color: "#d4956a" },
  { name: "Decor", value: 12, color: "#b8956a" },
  { name: "Supplies", value: 8, color: "#c8b8a8" },
];

export const statusMeta = {
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700" },
  processing: { label: "Processing", bg: "bg-blue-50", text: "text-blue-700" },
  shipped: { label: "Shipped", bg: "bg-purple-50", text: "text-purple-700" },
  delivered: { label: "Delivered", bg: "bg-green-50", text: "text-green-700" },
  cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600" },
};
