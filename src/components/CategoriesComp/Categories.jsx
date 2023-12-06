import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "./CategoriesItem";
import { getCategory } from "../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
function Categories() {
  const { categories } = useSelector((state) => state.data);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [];
    categories.forEach((event) => {
      const existingCategory = uniqueCategories.find(
        (category) => category.name === event.eventCategory.name
      );
      if (!existingCategory) {
        uniqueCategories.push({
          name: event.eventCategory.name,
          image: event.eventCategory.image,
        });
      }
    });
    setUniqueCategories(uniqueCategories);
  }, [categories]);

  return (
    <div className="my-0 mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <h3 className="uppercase before:bg-color-myrtle-green before:w-1 before:h-4 before:block  flex before:mr-5 p-5 items-center font-bold text-2xl text-[#373737]">
          Events By Categories
        </h3>
        <button
          className="rounded-md px-4 h-12 uppercase bg-[#544242] text-white hover:bg-[#7b6060] transition-all duration-200"
          onClick={() => navigate(`events/All`)}
        >
          All Events
        </button>
      </div>
      <div
        className="grid-cols-1 grid  sm:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 
      md:grid-cols-2 p-3 ml-4 w-full text-white uppercase text-2xl gap-y-8"
      >
        {uniqueCategories.map((e, i) => {
          return <CategoriesItem category={e} key={i} />;
        })}

        {/* {categories.map((e, i) => (
          <CategoriesItem category={e} key={i} />
        ))} */}
      </div>
    </div>
  );
}

export default Categories;
