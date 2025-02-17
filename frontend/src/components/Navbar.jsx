import React, { useState, useEffect, useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Import sun & moon icons
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedIn } = useContext(AppContext);
  const logout = async () => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/auth/logout`
      );

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/auth/send-verify-otp`
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        {userData ? (
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                {!userData.isAccountVerified ? (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify Email
                  </li>
                ) : null}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="Arrow" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
