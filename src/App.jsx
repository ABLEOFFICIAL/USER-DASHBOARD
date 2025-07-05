import React from "react";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import ProfileInfo from "./pages/ProfileInfo";
import Address from "./pages/Address";
import Address2 from "./pages/Address2";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./context/ProtectedRoute";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profile-info" element={<ProfileInfo />} />
        <Route path="/add-address" element={<Address />} />
        <Route path="/add-address2" element={<Address2 />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
