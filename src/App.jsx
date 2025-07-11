import React, { useEffect, useState } from "react";
import Register from "./pages/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileInfo from "./pages/ProfileInfo";
import Address from "./pages/Address";
import Address2 from "./pages/Address2";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { auth } from "./config/firebase"; // Import your Firebase auth
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading spinner while Firebase checks authentication state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/profile-info" element={<ProfileInfo />} />
        <Route path="/add-address" element={<Address />} />
        <Route path="/add-address2" element={<Address2 />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/register" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
