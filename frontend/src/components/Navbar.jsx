import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 lg:bg-gray-900/50 backdrop-blur-md shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-5 px-6 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent transition duration-300 hover:scale-105"
        >
          Elite Zoho
        </Link>

        {/* Menu Toggle Button (Mobile) */}
        <button
          className="lg:hidden text-white text-3xl transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="hover:rotate-90" /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`lg:flex lg:items-center lg:space-x-8 transition-all duration-500 ease-in-out ${
            menuOpen
              ? "block opacity-100 transform scale-100"
              : "hidden opacity-0 scale-95"
          } lg:block absolute lg:static top-20 left-0 w-full lg:w-auto shadow-lg lg:shadow-none p-5 lg:p-0 rounded-lg bg-gray-800/90 lg:bg-transparent backdrop-blur-md`}
        >
          <li>
            <Link
              to="/"
              className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
            >
              Home
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
              {user.role === "vendor" && (
                <li>
                  <Link
                    to="/vendor"
                    className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
                  >
                    Vendor Panel
                  </Link>
                </li>
              )}
              {user.role === "user" && (
                <li>
                  <Link
                    to="/user"
                    className="block py-3 px-6 text-lg font-semibold text-white lg:text-blue-300 transition-all duration-300 hover:text-blue-400 hover:scale-105"
                  >
                    User Panel
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
