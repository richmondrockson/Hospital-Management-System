import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`border border-gray-300 rounded-lg px-3 py-2 w-full 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition duration-150 ease-in-out ${className}`}
    />
  );
};

export default Input;
