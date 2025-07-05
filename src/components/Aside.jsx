import React, { useState } from "react";
import settings from "../assets/setting 1.png";
import key from "../assets/key-square.png";
import product from "../assets/3d-square 1.png";
import user from "../assets/user-square 1.png";
import wallet from "../assets/wallet-money 2.png";
import discount from "../assets/discount-shape 1.png";
import message from "../assets/message-question 1.png";
import userImg from "../assets/Ellipse 8.png";
import dropDown from "../assets/chevron-down 2.png";
import { GrClose } from "react-icons/gr";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const menuItems = [
    { icon: key, label: "Dashboard" },
    { icon: product, label: "Product" },
    { icon: user, label: "Customers", isActive: true },
    { icon: wallet, label: "Income" },
    { icon: discount, label: "Promote" },
    { icon: message, label: "Help" },
  ];

  return (
    <>
      {/* Settings Icon for Mobile */}
      <button
        className="fixed top-4 left-3 md:hidden z-0"
        onClick={toggleSidebar}
      >
        <img src={settings} alt="Settings" className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-white shadow-lg px-5 py-10 flex flex-col justify-between h-screen z-40 transition-all duration-300 md:static md:h-auto ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <button
            className={`flex items-center gap-2 ${
              isOpen ? "justify-start" : "justify-center md:justify-center"
            }`}
            onClick={toggleSidebar}
          >
            <img src={settings} alt="Settings" className="h-6 w-6" />
            {isOpen && <h1 className="text-lg font-semibold">Dashboard</h1>}
          </button>
          {}

          {/* Menu Items */}
          <nav className="flex flex-col gap-4 text-sm text-[#9197b3]">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                  item.isActive
                    ? "bg-[#5932ea] text-white"
                    : isOpen
                    ? "hover:bg-gray-100"
                    : ""
                } ${
                  isOpen ? "justify-start" : "justify-center md:justify-center"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`h-5 w-5 ${!isOpen && "md:block"}`}
                />
                {isOpen && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-6">
          {isOpen && (
            <div className="rounded-2xl p-6 bg-gradient-to-b from-[#eaabf0] to-[#4623e9] text-white text-center">
              <p className="text-sm font-semibold mb-4">
                Upgrade to PRO to get access to all Features!
              </p>
              <button className="w-full bg-white text-[#4925e9] rounded-full py-2 text-sm font-medium">
                Get Pro Now
              </button>
            </div>
          )}

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <img
                src={userImg}
                alt="User"
                className={` ${!isOpen && "md:block"}`}
              />
              {isOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Name</span>
                  <span className="text-xs text-[#757575]">
                    Project Manager
                  </span>
                </div>
              )}
            </div>
            {isOpen && (
              <img src={dropDown} alt="Dropdown" className="h-5 w-5" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
