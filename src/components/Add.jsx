import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category_id: ""
  });

  // Update form data when user types/selects
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/", formData);
      console.log("Item created:", res.data);
      alert("Item added successfully!");
      setFormData({ name: "", description: "", price: "", category_id: "" });
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item.");
    }
  };

  return (
    <section className="w-full min-h-[100vh] p-4 md:px-20 md:py-15 bg-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Add Items</h2>
      <Link to={"/"}>Home</Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[400px] p-6 rounded-2xl bg-white/50 backdrop-blur-md shadow"
      >
        <input
          type="text"
          placeholder="Item name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Image link... "
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
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">-- Select Category --</option>
          <option value="1">Sun Screen</option>
          <option value="2">Moisterizer</option>
        </select>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </form>
    </section>
  );
};

export default Add;
