import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full md:px-20 bg-white/30 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyStore
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/add" className="hover:text-blue-500 transition">
            Add Item
          </Link>
          <Link to="/protected" className="hover:text-blue-500 transition">
            Protected
          </Link>

          {accessToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
