import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { createEventPhoto, getEvents } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function EventPhotoAddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedEventFromForm, setSelectedEventFromForm] = useState("");
  const { events } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const location = useLocation();
  const state = location.state;

  const { selectedEventObj, isNew } = state;

  const formik = useFormik({
    initialValues: {
      photo: "",
      event: !isNew ? selectedEventObj.eventName : "",
    },
    validationSchema: Yup.object({
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      const { photo } = values;
      if (isNew ? selectedEventFromForm : selectedEventObj) {
        dispatch(
          createEventPhoto({
            eventId: !isNew ? selectedEventObj.eventId : selectedEventFromForm,
            eventPhoto: photo,
          })
        );
        navigate("/admin/EventPhotos");
      }
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
          Add EventPhoto
        </h2>

        <Input label="Event Photo" type="text" name="photo" formik={formik} />

        {!isNew ? (
          <Input
            label="Event"
            type="text"
            name="event"
            formik={formik}
            disabled={true}
          />
        ) : (
          <div className="flex flex-col text-gray-400 py-2">
            <label>Event</label>
            <select
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                setSelectedEventFromForm(
                  selectedOption.value ? selectedOption.value : ""
                );
              }}
            >
              <option value="chooseEvent">Choose event</option>
              {events.map((event) => (
                <option value={event.id}>{event.eventName}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Add
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

export default EventPhotoAddForm;
