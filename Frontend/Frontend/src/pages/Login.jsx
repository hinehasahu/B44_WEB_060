
// import React, { useState } from "react";
// import { useAuth } from "../context/authContext";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const res = await login(email, password);
//     if (res.success) {
//       navigate("/");
//     } else {
//       setError(res.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="name@email.com"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="password"
//           className="w-full p-2 border rounded"
//         />
//         {error && <p className="text-red-500 text-sm">{error} <span className="text-blue-500 underline text-sm"><Link to='/signup'>Go to Signup</Link></span> </p>}
//         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
// pages/Login.js
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);

    if (res.success) {
      navigate("/dashboard"); // or home
    } else {
      setError(res.message || "User not found. Please sign up.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
