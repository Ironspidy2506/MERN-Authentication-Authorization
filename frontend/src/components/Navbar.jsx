import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Import sun & moon icons
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 transition-all">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all"
        >
          {darkMode ? (
            <FiSun className="text-yellow-500 w-6 h-6" />
          ) : (
            <FiMoon className="text-gray-800 dark:text-white w-6 h-6" />
          )}
        </button>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
