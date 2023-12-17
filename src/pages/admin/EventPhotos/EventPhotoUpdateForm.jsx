import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateEventPhotoWithId } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function EventPhotoUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const { eventPhoto, selectedEventObj } = state;

  const formik = useFormik({
    initialValues: {
      photo: eventPhoto.eventPhoto,
      event: selectedEventObj.eventName,
    },
    validationSchema: Yup.object({
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      const { photo } = values;

      console.log("values", values);

      dispatch(updateEventPhotoWithId({ id, eventPhoto: photo }));
      navigate("/admin/EventPhotos");
    },
    onReset: () => {
      formik.setValues({ photo: "" });
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Update EventPhoto
        </h2>

        <Input label="Event Photo" type="text" name="photo" formik={formik} />
        <Input
          label="Event Name"
          type="text"
          name="event"
          formik={formik}
          disabled={true}
        />

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Update
        </button>

        <p class="text-white flex justify-end">
          <button
            onClick={() => navigate("/admin/EventPhotos", { replace: true })}
          >
            Back EventPhotos{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default EventPhotoUpdateForm;
