import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createSeat, updateSeatWithId } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function SeatUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { selectedEventObj, seat } = location.state;

  const formik = useFormik({
    initialValues: {
      name: seat.seatName,
      event: selectedEventObj.eventName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
      const { name } = values;

      console.log("values", values);

      dispatch(
        updateSeatWithId({
          id,
          seatName: name,
          eventId: selectedEventObj.eventId,
        })
      );
      navigate("/admin/Seats");
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
          Update Seat
        </h2>
        <Input label="Seat Name" type="text" name="name" formik={formik} />

        <Input
          label="Event"
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
          <button onClick={() => navigate("/admin/Seats", { replace: true })}>
            Back Seats{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default SeatUpdateForm;
