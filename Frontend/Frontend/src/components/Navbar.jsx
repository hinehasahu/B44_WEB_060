
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Crime Tracker</h1>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <ul className={`md:flex gap-6 items-center ${menuOpen ? "block" : "hidden"} md:block`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/report">Crime Report</Link></li>
          <li><Link to="/cases">Case Details</Link></li>

          {user?.isLoggedIn ? (
            <>
              <li>👋 Hello, {user.role === "admin" ? "Admin" : user.name}</li>
              <li>
                <button onClick={handleLogout} className="text-red-300 hover:text-red-500">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
