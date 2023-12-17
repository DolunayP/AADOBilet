import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";
import Logo from "../LogoComp/Logo.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSession,
  getUserSessionDatabase,
  logoutUser,
} from "../../redux/dataSlice.js";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.data);

  console.log("userData", userData);

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0 && user !== undefined) {
      dispatch(getUserSessionDatabase(user.id));
    }
  }, [dispatch, user]);

  let Links = [];
  if (user) {
    Links = [
      userData.authenticated_role === "admin" && {
        name: "Admin Panel",
        link: "/admin",
      },
      { name: "Events", link: "/events" },
      { name: "Past Events", link: "/pastevents" },
      { name: "Logout", link: "/" },
    ];
  } else {
    Links = [
      { name: "Login", link: "/login" },
      { name: "Events", link: "/events" },
      { name: "Past Events", link: "/pastevents" },
    ];
  }
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="px-7 font-bold">
      <div className="md:flex items-center justify-between md:px-10 px-7 font-bold">
        <div className="cursor-pointer flex items-center">
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
          className={`md:flex md:items-center md:pb-0 py-10 md:w-auto md:static absolute left-0 w-full transition-all duration-500 ease-in ${
            open ? "top-24 z-100 bg-black bg-opacity-90" : "top-[-490px]"
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
                    className={`hover:text-opacity-50 transition-all duration-200  ${
                      link.name === "Admin Panel"
                        ? "text-green-800"
                        : "text-white"
                    }`}
                    onClick={() => {
                      if (link.name === "Logout") {
                        dispatch(logoutUser());
                        setTimeout(() => {
                          window.location.href = "/";
                        }, 300);
                      } else if (link.name === "Events") {
                        window.location.href = "/events";
                      } else if (link.name === "Admin Panel") {
                        window.location.href = "/admin";
                      } else {
                        window.location.href = "/pastevents";
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
                      } else if (link.name === "Events") {
                        window.location.href = "/events";
                      } else {
                        window.location.href = "/pastevents";
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
