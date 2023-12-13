import React from "react";
import { useNavigate } from "react-router-dom";

const EventsCard = ({ event }) => {
  const { eventDesc, eventHour, eventLocation, eventFinishHour, eventName, eventDate } = event;
  const navigate = useNavigate();
  const getDetails = (id) => {
    navigate(`/details/${id}`);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className="w-[23%] text-gray-100 group-hover:opacity-0 sm:group-hover:opacity-95 shadow-[10px_14px_16px_-2px_rgba(0,0,0,0.3)] gap-2 flex flex-col bg-[#32847a] rounded-lg py-8 ps-6 pe-2">
        <div className="flex items-center justify-center">
          <div className="overflow-hidden w-[140px] h-[140px] object-cover rounded-full">
            <img
              src={event.artists[0].artistPhoto}
              alt=""
              className="h-full w-full"
            />
          </div>
        </div>
        <h2 className="ms-2 text-2xl font-bold">{eventName}</h2>
        <p className="text-start">{eventDesc}</p>
        <p className="text-start">
          <span className="font-bold">Location:</span> {eventLocation}{" "}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Starting Time:</span> {eventHour}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Ending Time:</span> {eventFinishHour}
        </p>
        <p className="text-start">
          <span className="font-bold">Event Date:</span> {eventDate}
        </p>

        <a
          onClick={() => { getDetails(event.id); handleScrollToTop() }}
          className="cursor-pointer shadow-xl mt-4 me-4 py-3 px-6 bg-black text-white rounded-full hover:scale-95 hover:text-[#67f7e6] transition-all duration-500"
        >
          Buy a Ticket
        </a>
        <a
          onClick={() => { getDetails(event.id); handleScrollToTop() }}
          className="cursor-pointer me-4 py-3 px-6 bg-black text-white rounded-full hover:scale-95 hover:text-[#67f7e6] transition-all duration-500"
        >
          See Details
        </a>
      </div >
    </>
  );
};

export default EventsCard;
