import React, { useState } from "react";
import Button from "./Button.jsx";

const HeaderMenu = () => {
  let Links = [
    { name: "Gift Cards", link: "/" },
    { name: "Sell", link: "/" },
    { name: "My Tickets", link: "/" },
    { name: "Login", link: "/login" },
  ];
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="p-7">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800"
        >
          <img src="/logo-removebg-preview.png" alt="Logo" className="h-20" />
        </div>
        <div
          onClick={toggleMenu}
          className="text-3xl absolute right-8 top-16 cursor-pointer md:hidden"
        >
          <ion-icon
            name={open ? "close" : "menu"}
            style={{ color: "white" }}
          ></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-32 z-50 bg-black bg-opacity-90" : "top-[-490px] z-0"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-white hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <a href="/login">
            <Button>Sign Up</Button>
            </a>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
