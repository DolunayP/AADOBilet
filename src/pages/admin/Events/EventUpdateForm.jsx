import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateEventById } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function EventUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const {
    eventName,
    eventHour,
    eventFinishHour,
    eventDate,
    eventLocation,
    categoryId,
    isFree,
  } = state;

  const formik = useFormik({
    initialValues: {
      name: eventName,
      hour: eventHour,
      finishHour: eventFinishHour,
      date: eventDate,
      location: eventLocation,
      category: categoryId,
      isFree,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      hour: Yup.string().required("Hour is required"),
      finishHour: Yup.string().required("Finish Hour is required"),
      date: Yup.string().required("Date is required"),
      location: Yup.string().required("Location is required"),
      category: Yup.string().required("Category is required"),
      isFree: Yup.string().required("IsFree is required"),
    }),
    onSubmit: (values) => {
      const { name, hour, finishHour, date, location, category, isFree } =
        values;

      console.log(values);

      dispatch(
        updateEventById({
          id,
          name,
          hour,
          finishHour,
          date,
          location,
          category,
          isFree,
        })
      );
      navigate("/admin/Events");
    },
  });

  return (
    <div className="grid place-items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[800px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Update Event
        </h2>
        <Input label="Name" type="text" name="name" formik={formik} />
        <Input label="Hour" type="text" name="hour" formik={formik} />
        <Input
          label="Finish Hour"
          type="text"
          name="finishHour"
          formik={formik}
        />
        <Input label="Date" type="text" name="date" formik={formik} />
        <Input label="Location" type="text" name="location" formik={formik} />
        <Input label="Category" type="text" name="category" formik={formik} />
        <Input label="Is Free" type="text" name="isFree" formik={formik} />

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Update
        </button>

        <p class="text-white flex justify-end">
          <button onClick={() => navigate("/admin/Events", { replace: true })}>
            Back Events
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default EventUpdateForm;
