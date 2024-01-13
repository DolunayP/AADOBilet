import React from "react";
import { useNavigate } from "react-router-dom";

const EventsCard = ({ event, path }) => {
  const {
    eventDesc,
    eventHour,
    eventLocation,
    eventFinishHour,
    eventName,
    eventDate,
  } = event;

  const navigate = useNavigate();
  const getDetails = (id) => {
    navigate(`/details/${id}`, {
      state: path,
    });
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="w-[23%] min-w-[340px] md:min-w-[400px] min-h-[560px] relative text-gray-100 group-hover:opacity-0 sm:group-hover:opacity-95 shadow-[10px_14px_16px_-2px_rgba(0,0,0,0.3)] gap-2 flex flex-col bg-[#32847a] rounded-lg py-8 ps-6 pe-2">
        <div className="flex items-center justify-center">
          <div className="overflow-hidden w-[140px] h-[140px] object-cover rounded-full">
            <img
              src={event.artists[0].artistPhoto}
              alt=""
              className="h-full w-full"
            />
          </div>
        </div>
        <h2 className="ms-2 text-2xl font-bold uppercase">{eventName}</h2>
        <p className="text-start">{eventDesc}</p>
        <p className="text-start">
          <span className="font-bold">Location:</span> {eventLocation}{" "}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Starting Time:</span> {eventHour}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Ending Time:</span>{" "}
          {eventFinishHour}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Date:</span> {eventDate}
        </p>
        <div className="absolute bottom-4 left-0 mx-auto flex items-center justify-center w-full">
          {path === "pastevents" && (
            <a
              onClick={() => {
                getDetails(event.id);
                handleScrollToTop();
              }}
              className="mx-auto cursor-pointer shadow-xl mt-4 py-3 px-6 bg-black text-white w-[70%] rounded-full hover:scale-95 hover:text-[#67f7e6] transition-all duration-500"
            >
              Buy a Ticket
            </a>
          )}
          <a
            onClick={() => {
              getDetails(event.id);
              handleScrollToTop();
            }}
            className="mx-auto cursor-pointer py-3 px-6 bg-black text-white rounded-full w-[70%] hover:scale-95 hover:text-[#67f7e6] transition-all duration-500"
          >
            See Details
          </a>
        </div>
      </div>
    </>
  );
};

export default EventsCard;
