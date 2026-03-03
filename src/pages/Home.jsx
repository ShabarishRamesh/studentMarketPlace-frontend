import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    // Just generate the URL dynamically
    const navigate = useNavigate();


    // Fetch top 4 latest products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/addproduct?limit=4&sort=desc");
                setFeaturedProducts(res.data);
            } catch (err) {
                console.error("Error fetching featured products:", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-b-3xl shadow-lg overflow-hidden">
                <div className="absolute inset-0 w-full h-full object-cover opacity-30" ></div>
                <div className="relative text-center py-32 px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        Welcome to Student Marketplace
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        Discover amazing products, best deals, and shop seamlessly.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition transform duration-300"
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            {/* CATEGORIES SECTION */}
            <div className="mt-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        { name: "Electronics", icon: "💻" },
                        { name: "Fashion", icon: "👗" },
                        { name: "Books", icon: "📚" },
                        { name: "Sports", icon: "🏀" },
                    ].map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() =>
                                navigate(`/products?category=${cat.name.toLowerCase()}`)
                            }
                            className="cursor-pointer bg-white px-6 py-6 rounded-2xl shadow-lg hover:scale-105 transition transform duration-300 flex flex-col items-center"
                        >
                            <span className="text-4xl mb-2">{cat.icon}</span>
                            <span className="font-semibold">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="mt-16 px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {featuredProducts.length === 0 && (
                        <p className="text-center text-gray-500 col-span-full">
                            No featured products yet.
                        </p>
                    )}
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-2xl rounded-3xl overflow-hidden hover:scale-105 transition transform duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-56 w-full object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    New
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-2 truncate">{product.title}</h3>
                                <p className="text-blue-600 font-extrabold mb-2 text-lg">₹ {product.price}</p>
                                <p className="text-gray-400 text-sm mb-4 truncate">
                                    Seller: {product.seller.name}
                                </p>
                                <button
                                    onClick={() => navigate(`/products`)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow hover:scale-105 transition transform duration-300"
                                >   
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}