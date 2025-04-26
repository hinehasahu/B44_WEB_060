import React from "react";
import "../src/App.css"
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportCrime from "./pages/ReportCrime";
import CaseDetails from "./pages/CaseDetails";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import AllCases from "./pages/allCases";
import AddWitnessForm from "./pages/addWitness";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportCrime />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <ProtectedRoute>
              <CaseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allCases"
          element={
            <ProtectedRoute>
              <AllCases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-witness"
          element={
            <ProtectedRoute>
              <AddWitnessForm/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
    </>
  );
}

export default App;