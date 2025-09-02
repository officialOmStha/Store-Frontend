// src/components/Add.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category_id: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Update form data when user types/selects
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to API (requires login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access"); // use the same key as in login
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/additem/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Item created:", res.data);
      setSuccess("Item added successfully!");
      setFormData({
        name: "",
        image: "",
        description: "",
        price: "",
        category_id: ""
      });
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Failed to add item. Check console.");
    } finally {
      setLoading(false);
      navigate("/")
    }
  };

  return (
    <section className="w-full min-h-[100vh] p-4 md:px-20 md:py-15 bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 mt-6">Add Item</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[400px] p-6 rounded-2xl bg-white/50 backdrop-blur-md shadow"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          placeholder="Item name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Image link..."
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Description..."
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">-- Select Category --</option>
          <option value="1">Sun Screen</option>
          <option value="2">Moisturizer</option>
          <option value="3">Lipstick</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} transition`}
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </section>
  );
};

export default Add;
