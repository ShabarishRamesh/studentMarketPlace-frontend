import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // 1️⃣ Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items); // adjust depending on your backend structure
    };

    fetchCart();
  }, []);

  // 2️⃣ Replace your old increment/decrement/removeItem with these:
  const increment = async (index) => {
    const token = localStorage.getItem("token");
    const updated = [...cart];
    updated[index].quantity += 1;
    
    await API.post("/cart/add", {
      productId: updated[index].product._id,
      quantity: 1,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setCart(updated);
  };

  const decrement = async (index) => {
    const token = localStorage.getItem("token");
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;

      await API.post("/cart/add", {
        productId: updated[index].product._id,
        quantity: -1, // send negative to reduce
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCart(updated);
    }
  };

  const removeItem = async (index) => {
    const token = localStorage.getItem("token");
    const updated = [...cart];
    
    await API.post("/cart/remove", {
      productId: updated[index].product._id,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    updated.splice(index, 1);
    setCart(updated);
  };

  // 3️⃣ Total
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 px-4">
                    <h3 className="font-semibold text-lg">{item.product.title}</h3>
                    <p className="text-gray-500">{item.product.description}</p>
                    <p className="text-gray-800 font-bold mt-1">
                      ₹{item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => decrement(index)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => increment(index)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4">
              <p className="text-xl font-bold text-gray-800">
                Total: ₹{total.toFixed(2)}
              </p>
              <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}