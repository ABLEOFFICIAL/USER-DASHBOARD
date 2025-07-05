import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`md:w-[502px] w-[350px] h-[592px] rounded-[24px] shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
