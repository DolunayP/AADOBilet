import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { addTicket, getEvents } from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function TicketPriceAddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedEventFromForm, setSelectedEventFromForm] = useState("");
  const selectedEvent = location.state.selectedEventObj;
  const ticketCategoriesByEvent = location.state.ticketCategoriesByEvent;
  const isNew = location.state.isNew;
  const { events } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      event: selectedEvent.eventName,
    },
    validationSchema: Yup.object({
      event: Yup.string().required("Event is required"),
    }),
    onSubmit: (values) => {
      console.log("sadasdas");
      console.log("values", selectedCategory.categoryId, selectedEvent.eventId);

      dispatch(
        addTicket({
          categoryId: selectedCategory.categoryId,
          eventId: selectedEvent.eventId,
        })
      );
      navigate("/admin/TicketCategories");
    },
  });

  return (
    <div className=" flex flex-col pt-[120px]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      >
        <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
          Add Ticket
        </h2>
        {/* <Input label="Category Name" type="text" name="name" formik={formik} />  */}
        <div className="flex flex-col text-gray-400 py-2">
          <label>Category</label>
          <select
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              const price = selectedOption.getAttribute("data-price");

              setSelectedCategory({
                categoryName: selectedOption.text,
                categoryId: selectedOption.value,
                price,
              });
            }}
          >
            {ticketCategoriesByEvent &&
              ticketCategoriesByEvent.map((category) => (
                <option value={category.id} data-price={category.price}>
                  {category.categoryName}{" "}
                </option>
              ))}
          </select>
        </div>
        <Input
          label="Price"
          type="text"
          name="price"
          formik={formik}
          value={selectedCategory.price}
          disabled={true}
        />
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
                setSelectedEventFromForm(selectedOption.value);
              }}
            >
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
          <button
            onClick={() =>
              navigate("/admin/TicketCategories", { replace: true })
            }
          >
            Back Ticket Categories{" "}
          </button>
          !
        </p>
      </form>
    </div>
  );
}

export default TicketPriceAddForm;
