// SignIn.js
import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CategoryFormInput from "./CategoryFormInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCategoryWithId } from "../../../redux/dataSlice";

function CategoryUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const { name, photo } = state;

  const formik = useFormik({
    initialValues: {
      name,
      photo,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      const { name, photo } = values;

      dispatch(
        updateCategoryWithId({ id, categoryName: name, categoryPhoto: photo })
      );
      navigate("/admin/Categories");
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Update Category
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
          Update
        </button>

        <p class="text-white flex justify-end">
          <button
            onClick={() => navigate("/admin/Categories", { replace: true })}
          >
            Back Categories
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default CategoryUpdateForm;
