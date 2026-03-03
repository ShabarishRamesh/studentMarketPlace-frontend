import { useState } from "react";
import API from "../api/axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("image", form.image);
      data.append("category", form.category);

      await API.post("/addproduct", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ Product Added Successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        image: null,
      });
      console.log("TOKEN:", localStorage.getItem("token"));

    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
      console.log("TOKEN:", localStorage.getItem("token"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Product 📦
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* TITLE */}
          <div>
            <label className="block mb-1 font-semibold">Product Title</label>
            <input
              type="text"
              value={form.title}
              placeholder="Enter product name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              value={form.description}
              placeholder="Enter product description"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="sports">Sports</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-1 font-semibold">Price (₹)</label>
            <input
              type="number"
              value={form.price}
              placeholder="Enter price"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-1 font-semibold">Upload Image</label>
            <input
              type="file"
              className="w-full border p-2 rounded-lg bg-gray-50"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              required
            />

            {/* IMAGE PREVIEW */}
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="preview"
                className="mt-3 h-40 rounded-lg object-cover"
                onLoad={() => URL.revokeObjectURL(form.image)} // release memory
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "➕ Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}