import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  assignTicketById,
  createSeat,
  fetchAllSeats,
  getTicketOfEventById,
  updateSeatWithId,
} from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function AssignTicketForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(0);
  const location = useLocation();
  const { eventTicketsAdmin } = useSelector((state) => state.data);
  const { id } = useParams();
  const { selectedEventObj, seat } = location.state;

  const filteredTickets = eventTicketsAdmin.filter(
    (ticket) => !ticket.isAssign
  );

  console.log("filteredTickets", filteredTickets);
  console.log("selectedTicket", selectedTicket);

  useEffect(() => {
    dispatch(getTicketOfEventById(selectedEventObj.eventId));
  }, [dispatch]);

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
        assignTicketById({
          ticketId: selectedTicket,
          id,
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
          Assign Ticket
        </h2>
        <Input label="Seat Name" type="text" name="name" formik={formik} />

        <Input
          label="Event"
          type="text"
          name="event"
          formik={formik}
          disabled={true}
        />

        <div className="flex flex-col text-gray-400 py-2">
          <label>Tickets</label>
          <select
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setSelectedTicket(selectedOption.value);
            }}
          >
            {filteredTickets.map((ticket) => (
              <option value={ticket.id}>
                {ticket.ticketCategories?.categoryName}
                {"    -    "}
                {ticket.ticketCategories?.price} ₺
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Assign
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

export default AssignTicketForm;
