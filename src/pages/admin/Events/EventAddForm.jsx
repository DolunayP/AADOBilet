import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  createEvent,
  getArtistTest,
  getCategoryTest,
  updateEventById,
} from "../../../redux/dataSlice";
import Input from "../Category/CategoryFormInput";
import { useNavigate } from "react-router-dom";

function EventAddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesTest, artists } = useSelector((state) => state.data);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArtists, setSelectedArtists] = useState([]);

  const uniqueArtists = [];

  if (selectedArtists) {
    selectedArtists.forEach((artist) => {
      const artistId = artist?.artistId;
      const artistName = artist?.artistName;

      const foundArtist = uniqueArtists.find(
        (artist) => artist.artistId === artistId
      );

      if (!foundArtist) {
        uniqueArtists.push({ artistId, artistName });
      }
    });
  }

  const artistIds = uniqueArtists.map((artist) => artist.artistId);

  console.log(artistIds);

  useEffect(() => {
    dispatch(getCategoryTest());
    dispatch(getArtistTest());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      hour: "",
      finishHour: "",
      date: "",
      desc: "",
      location: "",
      category: "",
      artists: "",
      isFree: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      hour: Yup.string().required("Hour is required"),
      finishHour: Yup.string().required("Finish Hour is required"),
      date: Yup.string().required("Date is required"),
      desc: Yup.string().required("Desc is required"),
      location: Yup.string().required("Location is required"),

      isFree: Yup.string().required("IsFree is required"),
    }),
    onSubmit: (values) => {
      const { name, hour, finishHour, date, desc, location, isFree } = values;

      dispatch(
        createEvent({
          artists: artistIds,
          name,
          hour,
          finishHour,
          date,
          desc,
          location,
          category: selectedCategory,
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
          Add Event
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
        <Input label="Desc" type="text" name="desc" formik={formik} />
        <Input label="Location" type="text" name="location" formik={formik} />
        <div className="flex flex-col text-gray-400 py-2">
          <label>Category</label>
          <select
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setSelectedCategory(selectedOption.value);
            }}
          >
            {categoriesTest.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Artist</label>
          <select
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];

              const newSelectedArtist = {
                artistId: selectedOption.value,
                artistName: selectedOption.text,
              };

              const updatedArtistsArr = [...selectedArtists];
              updatedArtistsArr.push(newSelectedArtist);

              setSelectedArtists(updatedArtistsArr);
            }}
          >
            {artists.map((artist) => (
              <option value={artist.id}>{artist.artistName}</option>
            ))}
          </select>
        </div>
        <Input
          label="Selected Artists"
          type="textarea"
          name="artists"
          formik={formik}
          disabled={true}
          value={
            selectedArtists && uniqueArtists.map((artist) => artist.artistName)
          }
        />

        {/* <Input label="Category" type="text" name="category" formik={formik} /> */}
        <Input label="Is Free" type="text" name="isFree" formik={formik} />

        <button
          type="submit"
          className="w-full my-5 py-2 bg-teal-600 shadow-lg shadow-teal-600/50 hover:shadow-teal-500/30 text-white rounded-lg"
        >
          Add
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

export default EventAddForm;
