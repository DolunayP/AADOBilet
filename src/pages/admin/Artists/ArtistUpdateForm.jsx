// SignIn.js
import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import Input from "../../../components/SignUp/Input";
import { updateArtistWithId } from "../../../redux/dataSlice";

function ArtistUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { artistName, artistPhoto } = location.state;

  const formik = useFormik({
    initialValues: {
      name: artistName,
      photo: artistPhoto,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      const { name, photo } = values;

      dispatch(
        updateArtistWithId({ id, artistName: name, artistPhoto: photo })
      );
      navigate("/admin/Artists");
    },
    onReset: () => {
      formik.setValues({ name: "", photo: "" });
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Add Artist
        </h2>
        <Input label="Artist Name" type="text" name="name" formik={formik} />
        <Input label="Artist Photo" type="text" name="photo" formik={formik} />

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Update
        </button>

        <p class="text-white flex justify-end">
          <button onClick={() => navigate("/admin/Artists", { replace: true })}>
            Back Artists{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default ArtistUpdateForm;
