import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LawyerPanel from "./pages/LawyerPanel";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CaseDetails from "./pages/CaseDetails";
import ReportCrime from "./pages/ReportCrime";
import AddWitnessForm from "./pages/addWitness";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user", "lawyer", "admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lawyer"
        element={
          <ProtectedRoute allowedRoles={["lawyer", "admin"]}>
            <LawyerPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/caseDetails/:id"
        // element={
        //   <ProtectedRoute allowedRoles={["lawyer", "admin"]}>
        //     <CaseDetails />
        //   </ProtectedRoute>
        // }
        element={
            <CaseDetails />
        
        }
      />

      <Route
              path="/reportCrime"
              // element={
              //   <ProtectedRoute allowedRoles={["lawyer", "admin"]}>
              //     <CaseDetails />
              //   </ProtectedRoute>
              // }
              element={
                  <ReportCrime />
              
              }
        />

        <Route
              path="/addwitness"
              // element={
              //   <ProtectedRoute allowedRoles={["lawyer", "admin"]}>
              //     <CaseDetails />
              //   </ProtectedRoute>
              // }
              element={
                  <AddWitnessForm />
              
              }
        />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
