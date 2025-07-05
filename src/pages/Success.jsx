import React, { useContext, useEffect } from "react";
import img from "../assets/Image.png";
import Card from "../components/Card";
import Mybtn from "../components/Mybtn";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Success = () => {
  const { setScreen, setData } = useContext(UserContext);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/register");
    setScreen("login");
  };
  useEffect(() => {
    setData({
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
  }, []);
  return (
    <main className="bg-[#FBFBFB] flex justify-center items-center min-h-screen">
      <Card>
        <div className="flex justify-center bg-[#ef49af]/14 rounded-t-[24px]">
          <img src={img} />
        </div>
        <div className="h-1/2 px-10 rounded-b-[24px] flex flex-col justify-center gap-10 items-center">
          <h1 className="font-bold text-[34px] md:text-[44px] md:text-start text-center leading-[48px] ">
            You are successfully registered!
          </h1>
          <Mybtn onClick={goToLogin}>Go to Login</Mybtn>
        </div>
      </Card>
    </main>
  );
};

export default Success;
