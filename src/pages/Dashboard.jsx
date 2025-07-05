import React, { useState } from "react";
import Aside from "../components/Aside";
import MainBoard from "../components/MainBoard";

const Dashboard = () => {
  return (
    <div className="bg-[#FAFBFF] flex h-screen overflow-x-hidden justify-between overflow-y-auto">
      <Aside />
      <MainBoard />
    </div>
  );
};

export default Dashboard;
