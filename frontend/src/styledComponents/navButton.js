import React from "react";

const NavButton = ({ text, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center rounded-lg bg-blue-700 text-white p-2 h-10 hover:bg-blue-800"
    >
      {icon} {text}
    </button>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button
      className="rounded-lg bg-blue-700 text-white p-2 h-10 hover:bg-blue-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { NavButton, Button };
