// pages/Signup.js
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Citizen" || "Lawyer" || "Admin",
    contactInfo: "",
    location: "",
    contactNo: "",
    isAnonymous: false,
  });

  console.log(form)
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(
      form.email,
      form.password,
      form.name,
      form.role,
      form.contactInfo,
      form.location,
      form.contactNo,
      form.isAnonymous
    );
    console.log("Signup result:", res);

    if (res.success) {
      setSuccessMsg("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(res.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* For Name */}
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* For Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* For Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300">
            <option value="user">Citizen</option>
            <option value="admin">Admin</option>
            <option value="admin">Lawyer</option>
          </select>

          {/* For Contact Info */}
          <input
            name="contactInfo"
            type="text"
            placeholder="Contact info"
            value={form.contactInfo}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* For Location */}
          <input
            name="location"
            type="text"
            placeholder="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* For Contact Number */}
          <input
            name="contactNo"
            type="text"
            placeholder="Contact no"
            value={form.contactNo}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          {/* For Anonymous role */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anonymous?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="anonymous"
                  value="yes"
                  checked={form.isAnonymous === true}
                  onChange={() => setForm({ ...form, isAnonymous: true })}
                  className="text-green-600 focus:ring-green-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="anonymous"
                  value="no"
                  checked={form.isAnonymous === false}
                  onChange={() => setForm({ ...form, isAnonymous: false })}
                  className="text-green-600 focus:ring-green-500"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
