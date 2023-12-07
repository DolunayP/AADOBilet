import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Forms = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
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
