import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "./CategoriesItem";
import { getCategoryTest } from "../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
function Categories() {
  const { categoriesTest } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryTest());
  }, [dispatch]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  };
  return (
    <div className="my-0 mx-auto max-w-7xl">
      <div className="flex items-center justify-between px-[4%] sm:px-[2.5%]">
        <div className="uppercase p-5 w-[180px] text-2xl font-extrabold">
          <span className="text-[#236059]">|</span> Events By <span className="text-[#236059]"> Categories</span>
        </div>
        <button
          className="font-semibold rounded-md px-4 h-12 uppercase bg-[#32847a] text-white hover:bg-[#236059] hover:scale-95 transition-all duration-500"
          onClick={() => { navigate(`events/All`); handleScrollToTop() }}
        >
          All Events
        </button>
      </div>
      <div
        className="grid-cols-1 grid  sm:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 
      md:grid-cols-2 p-3 ml-4 w-full text-white uppercase text-2xl gap-y-8"
      >
        {categoriesTest.map((e, i) => {
          return <CategoriesItem handleScrollToTop={handleScrollToTop} category={e} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Categories;
