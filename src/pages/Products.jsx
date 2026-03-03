import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/addproduct"); // GET all products
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    const res = await API.post("/cart/add", { productId, quantity: 1 }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(alert("added to cart"));
    console.log("Cart Updated:", res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Products Marketplace
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-blue-600 font-extrabold mb-2 text-lg">₹ {product.price}</p>
              <p className="text-gray-400 text-sm mb-4 ">Seller: {product.seller.name}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow hover:scale-105 transition transform duration-300">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}