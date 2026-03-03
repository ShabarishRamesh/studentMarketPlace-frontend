import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProductsSearch() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Fetch products dynamically based on filters
  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (category) params.append("category", category);

      const res = await API.get(`/addproduct/search?${params.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Call fetchProducts whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [search, minPrice, maxPrice, category]);

  // Add product to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      // Backend cart update
      await API.post(
        "/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Frontend cart update
      const existingIndex = cart.findIndex((p) => p._id === product._id);
      const updatedCart = [...cart];

      if (existingIndex >= 0) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert("✅ Added to cart!");
    } catch (err) {
      console.error("Cart error:", err);
      alert("❌ Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Products Marketplace
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="p-2 border rounded w-full md:w-32"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 border rounded w-full md:w-32"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          {/* Add more categories dynamically if needed */}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold mb-2">₹ {product.price}</p>
              <p className="text-sm text-gray-400">
                Seller: {product.seller.name}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}