import React from "react";

export function Button({ children, onClick, className = "", size = "md", variant = "default" }) {
  const base = "rounded-xl px-4 py-2 font-medium transition hover:opacity-90";
  const sizes = {
    sm: "text-sm py-1 px-3",
    md: "text-base",
    lg: "text-lg py-3 px-5",
  };
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-black",
  };

  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
