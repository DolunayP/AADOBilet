// SignIn.js
import React from "react";
import { useFormik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/dataSlice";

function SignIn({ toggleForm }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(login({ email, password }));
      setTimeout(() => {
        window.location.href = "/";
      }, 400);
      // TODO: BACKEND
      console.log("Form values:", values);
    },
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="grid md:grid md:grid-cols-2  h-screen w-full">
        <div className="bg-gray-800 flex flex-col pt-[120px]">
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
          >
            <h2 className="text-4xl dark:text-white font-bold text-center">
              SIGN IN
            </h2>
            <Input label="Email" type="text" name="email" formik={formik} />
            <Input
              label="Password"
              type="password"
              name="password"
              formik={formik}
            />
            <button
              type="submit"
              className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
            >
              Sign In
            </button>

            <p className="text-white">
              If you don't have an account yet, please{" "}
              <span className="font-bold cursor-pointer" onClick={toggleForm}>
                Sign Up
              </span>
              !
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
