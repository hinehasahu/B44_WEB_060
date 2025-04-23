import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useContext(AuthContext)

  if (!auth.isLoggedIn) return <Navigate to="/" />;
  if (!allowedRoles.includes(auth.user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;


