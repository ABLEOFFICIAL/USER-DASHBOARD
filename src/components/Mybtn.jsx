import React from "react";

const Mybtn = ({ children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#5932ea] w-full h-[56px] rounded-[12px] text-white py-2 px-4 cursor-pointer md:text-[16px] text-[14px] font-bold leading-[24px]"
    >
      {children}
    </button>
  );
};

export default Mybtn;
