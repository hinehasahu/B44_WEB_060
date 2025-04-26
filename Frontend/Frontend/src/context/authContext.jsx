import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false, role: "" });
console.log(user.isLoggedIn)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ isLoggedIn: true, role: decoded.role });
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch(
      "https://b44-web-060-5yqc.onrender.com/user/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser({ isLoggedIn: true, role: decoded.role });
      return { success: true };
    }
    return { success: false, message: data.message || "Login failed" };
  };

  const signup = async (email, password, name, role, contactInfo, location, contactNo, isAnonymous) => {
    try {
      const res = await fetch(
        "https://b44-web-060-5yqc.onrender.com/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, role, contactInfo, location, contactNo, isAnonymous }),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        setUser({ isLoggedIn: true, role: decoded.role });
        return { success: true };
      }

      return {
        success: false,
        message: data.message || "Signup failed",
      };
    } catch (err) {
      console.error("Signup error:", err);
      return {
        success: false,
        message: "Something went wrong while making signup request",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ isLoggedIn: false, role: "" });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
