import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUser } from "../../backend/user/user";
import { getUsers } from "../../redux/dataSlice";

const Forms = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const { users } = useSelector((state) => state.data);
  const navigate = useNavigate();

  console.log(users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    navigate(isSignIn ? "/register" : "/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 h-screen w-full">
        <div className="relative">
          <img
            className="w-full h-full object-cover object-left-bottom transition-transform duration-500 ease-in-out transform"
            src="/happy-holiday-21.png"
            alt="background"
            style={{
              transform: isSignIn ? "translateX(0%)" : "translateX(-100%)",
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
            {isSignIn ? (
              <SignIn toggleForm={toggleForm} />
            ) : (
              <SignUp toggleForm={toggleForm} />
            )}
          </div>
        </div>

        <div className="relative">
          <img
            className="w-full h-full object-cover object-left-bottom"
            src="/auth-image.png"
            alt="background"
          />
        </div>
      </div>
    </div>
  );
};

export default Forms;
