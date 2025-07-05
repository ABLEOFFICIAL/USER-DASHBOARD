import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to={"/register"} />;
};
