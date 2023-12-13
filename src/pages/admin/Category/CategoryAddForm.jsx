// SignIn.js
import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CategoryFormInput from "./CategoryFormInput";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../redux/dataSlice";

function CategoryAddForm({ toggleForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      const { name, photo } = values;

      console.log("values", values);

      dispatch(createCategory({ categoryName: name, categoryPhoto: photo }));
      navigate("/admin/Categories");
    },
    onReset: () => {
      formik.setValues({ name: "", photo: "" });
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-300 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Add Category
        </h2>
        <CategoryFormInput
          label="Category Name"
          type="text"
          name="name"
          formik={formik}
        />
        <CategoryFormInput
          label="Category Photo"
          type="text"
          name="photo"
          formik={formik}
        />

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Add
        </button>

        <p class="text-white flex justify-end">
          <button
            onClick={() => navigate("/admin/Categories", { replace: true })}
          >
            Back Categories{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default CategoryAddForm;
