import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [screen, setScreen] = useState("register");
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    subscription: false,
    fullName: "",
    phone: "",
    countryCode: "",
    birthDay: "",
    gender: "male",
    location: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);
  return (
    <UserContext.Provider
      value={{ data, setData, screen, setScreen, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
