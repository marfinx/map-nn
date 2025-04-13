import React from "react";

export function Input({ value, onChange, placeholder, className = "", ...rest }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...rest}
    />
  );
}
