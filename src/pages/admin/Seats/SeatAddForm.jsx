import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { createSeat, getEvents } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function SeatAddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEventFromForm, setSelectedEventFromForm] = useState("");
  const selectedEvent = location.state.selectedEventObj;
  const isNew = location.state.isNew;
  const { events } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  console.log(selectedEventFromForm);

  const formik = useFormik({
    initialValues: {
      name: "",
      event: isNew ? "" : selectedEvent.eventName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      const { name } = values;

      console.log("values", values);

      if (isNew ? selectedEventFromForm : selectedEvent) {
        dispatch(
          createSeat({
            seatName: name,
            eventId: !isNew ? selectedEvent.eventId : selectedEventFromForm,
          })
        );
        navigate("/admin/Seats");
      }
    },
    onReset: () => {
      formik.setValues({ name: "" });
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Add Seat
        </h2>
        <Input label="Seat Name" type="text" name="name" formik={formik} />

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
                  selectedOption.value !== "chooseOne"
                    ? selectedOption.value
                    : ""
                );
              }}
            >
              <option value="chooseOne">Choose event</option>
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

        <p className="text-white flex justify-end">
          <button onClick={() => navigate("/admin/Seats", { replace: true })}>
            Back Seats{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default SeatAddForm;
