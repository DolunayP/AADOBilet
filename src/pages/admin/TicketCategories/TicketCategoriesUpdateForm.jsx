import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CategoryFormInput from "../Category/CategoryFormInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  createTicketCategoryByEvent,
  updateTicketCategoryWithId,
} from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";

function TicketCategoriesUpdateForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedEventObj, ticketCategory } = location.state;

  console.log("add form", selectedEventObj);

  const formik = useFormik({
    initialValues: {
      name: ticketCategory.categoryName,
      price: ticketCategory.price,
      event: selectedEventObj.eventName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.string().required("Price is required"),
    }),
    onSubmit: (values) => {
      const { name, price } = values;

      dispatch(
        updateTicketCategoryWithId({
          id,
          categoryName: name,
          eventId: selectedEventObj.eventId,
          price,
        })
      );
      navigate("/admin/TicketCategories");
    },
    onReset: () => {
      formik.setValues({ name: "", price: "" });
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
        <Input label="Category Name" type="text" name="name" formik={formik} />
        <Input label="Price" type="text" name="price" formik={formik} />
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

export default TicketCategoriesUpdateForm;
