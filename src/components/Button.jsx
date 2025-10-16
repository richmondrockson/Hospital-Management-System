import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 active:scale-95 transition 
                  duration-150 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
