import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    try {
      const daata = await axios.get("http://127.0.0.1:8000/");
      setItems(daata.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
    console.log(items);
  }, []);

  return (
    <section className="w-full min-h-[100vh] p-4 md:px-20 md:py-15 bg-white flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl ">Nagina's Store</h1>
      <Link to={"add"}>Add item</Link>
      <Link to={"login"}>Login</Link>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex flex-wrap gap-6 w-full mt-8 items-center justify-center">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center w-[30%] p-4 border rounded-lg shadow bg-gray-50 transition-transform hover:translate-y-[-8px]"
            >
              <img 
              src={item.image} 
              alt={item.image} 
              width={150}
              loading="lazy"
              />
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-gray-700">{item.description}</p>
              <span className="text-sm text-yellow-600">
                Category: {item.category.name}
              </span>
              <span className="mt-2 font-semibold">Price: ${item.price}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
