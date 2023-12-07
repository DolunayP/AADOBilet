import React from "react";
import { useNavigate } from "react-router-dom";

const SliderCard = ({ events }) => {
  const { artists } = events;

  const navigate = useNavigate();

  const getDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      {
        <div
          style={{ boxShadow: "3px 11px 15px 0px rgba(0,0,0,0.5)" }}
          className="group artist-card relative transition-{flex} duration-500 ease hover:flex-[0.85] cursor-pointer h-[380px] flex-[0.33] md:flex-[0.25] rounded-md overflow-hidden object-cover -skew-x-[6deg]"
        >
          <img
            className="w-full h-full object-cover object-top"
            src={artists[0]?.artistPhoto}
            alt=""
          />
          <div className="w-[99%] group-hover:opacity-100 group-hover:translate-y-0 translate-y-[200%] text-white transition-all duration-700 bg-[#32847a] rounded-md p-4 absolute bottom-1 left-1 opacity-0 me-1">
            <h2 className="font-bold"> {events.eventName}</h2>
            <p className="text-sm">{events.eventDesc}</p>
            <button
              onClick={() => getDetails(events.id)}
              className="shadow-xl mt-4 me-4 py-3 px-6 bg-black text-white hover:scale-95 hover:text-[#6cebdc] transition-all duration-500"
            >
              See Details{" "}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default SliderCard;
