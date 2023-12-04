import React from "react";
import { useNavigate } from "react-router-dom"
function Categories() {
  const navigate = useNavigate();

  const goToEvents = () => {
    navigate('/events')
  }

  return (
    <div className="my-0 mx-auto max-w-7xl">
      <h3 className="uppercase before:bg-color-myrtle-green before:w-1 before:h-4 before:block  flex before:mr-5 p-5 items-center font-bold text-2xl text-[#373737]">
        Events By Categories
      </h3>
      <div
        className="grid-cols-1 grid  sm:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 
      md:grid-cols-2 p-3 ml-4 w-full text-white uppercase text-2xl gap-y-8"
      >
        <div onClick={() => { goToEvents() }} className=" w-11/12 h-7/8 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-events bg-cover "></div>
          <div className="absolute inset-0 bg-color-primary bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            events
          </p>
        </div>

        <div onClick={() => { goToEvents() }} className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-sports bg-cover "></div>
          <div className="absolute inset-0 bg-color-rose-ebony bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            sports
          </p>
        </div>

        <div onClick={() => { goToEvents() }} className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-parties bg-cover "></div>
          <div className="absolute inset-0 bg-color-secondary bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            parties
          </p>
        </div>

        <div onClick={() => { goToEvents() }} className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-communities bg-cover "></div>
          <div className="absolute inset-0 bg-color-night bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            communities
          </p>
        </div>

        <div onClick={() => { goToEvents() }} className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-theaters bg-cover "></div>
          <div className="absolute inset-0 bg-color-davys-gray bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            theaters
          </p>
        </div>

        <div onClick={() => { goToEvents() }} className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group">
          <div className="absolute inset-0 bg-concerts bg-cover "></div>
          <div className="absolute inset-0 bg-color-myrtle-green bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
          <p className="absolute group-hover: bg-opacity-90 tracking-widest">
            concerts
          </p>
        </div>
      </div>
    </div>
  );
}

export default Categories;
