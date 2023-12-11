import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";
import Logo from "../LogoComp/Logo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, logoutUser } from "../../redux/dataSlice.js";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getUserSession());
    console.log("user var mı", user);
  }, [dispatch]);

  let Links = [];
  if (user) {
    Links = [
      { name: "Logout", link: "/" },
      { name: "Events", link: "/events" },
    ];
  } else {
    Links = [
      { name: "Login", link: "/login" },
      { name: "Events", link: "/events" },
    ];
  }
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="p-7">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <Logo />
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
          <>
            {user && (
              <div className="text-white">
                {Object.keys(user).length > 0 ? (
                  <span className="font-bold text-lg">Welcome</span>
                ) : (
                  <span></span>
                )}{" "}
                {user.email}
              </div>
            )}
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                {user ? (
                  <button
                    className="hover:text-opacity-50 transition-all duration-200 text-white"
                    onClick={() => {
                      if (link.name === "Logout") {
                        dispatch(logoutUser());
                        setTimeout(() => {
                          window.location.href = "/";
                        }, 300);
                      } else {
                        window.location.href = "/events";
                      }
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (link.name === "Login") {
                        window.location.href = "/login";
                      } else {
                        window.location.href = "/events";
                      }
                    }}
                    className="text-white hover:text-gray-400 duration-500"
                  >
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </>
          {!user && (
            <a href="/login">
              <Button>Sign Up</Button>
            </a>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
