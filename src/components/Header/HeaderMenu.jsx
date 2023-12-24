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
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.data);

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
                  <div className="flex gap-2 items-center justify-center font-bold text-lg">
                    {" "}
                    <FaUserAlt /> Welcome {userData.username}{" "}
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                {user ? (
                  <button
                    className={`hover:text-opacity-60 flex items-center justify-center gap-2 transition-all duration-200 ${
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
                    {link.name}{" "}
                    {link.name === "Logout" ? (
                      <CiLogout />
                    ) : link.name === "Events" ? (
                      <MdEventAvailable />
                    ) : link.name === "Past Events" ? (
                      <MdOutlineSettingsBackupRestore />
                    ) : (
                      ""
                    )}
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
                    className="text-white hover:text-gray-400 duration-500 flex items-center gap-2 justify-center"
                  >
                    {link.name}{" "}
                    {link.name === "Login" ? (
                      <CiLogin />
                    ) : link.name === "Events" ? (
                      <MdEventAvailable />
                    ) : link.name === "Past Events" ? (
                      <MdOutlineSettingsBackupRestore />
                    ) : (
                      ""
                    )}
                  </button>
                )}
              </li>
            ))}
          </>
          {!user && (
            <a href="/register">
              <Button>Sign Up</Button>
            </a>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
