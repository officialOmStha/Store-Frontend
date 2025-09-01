// src/components/Protected.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Protected = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProtectedMessage = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/protected/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch protected data.");
      }
    };

    fetchProtectedMessage();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Protected Message</h2>
        {message ? (
          <p className="text-green-600">{message}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Protected;
