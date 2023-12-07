import React from "react";

const TimelineElement = ({ event }) => {
  const { eventName, eventHour, eventDesc, eventLocation, artists } = event;
  return (
    <div className="group relative flex sm:flex-col items-center justify-center sm:mb-0 mb-12">
      <div className="opacity-0 text-gray-100 absolute top-12 -translate-x-[440%] group-hover:translate-x-0 group-hover:opacity-0 sm:group-hover:opacity-95 transition-all duration-700 shadow-[10px_14px_16px_-2px_rgba(0,0,0,0.3)] w-72 gap-2 flex flex-col bg-[#32847a] rounded-lg py-4 ps-6 pe-2">
        <h2 className="ms-2 text-2xl font-bold">{eventName}</h2>
        <p className="text-start">{eventDesc}</p>
        <p className="text-start">
          {" "}
          <span className="font-bold">Location:</span> {eventLocation}{" "}
        </p>
        <p className="text-start">
          <span className="font-bold">Time:</span> {eventHour}
        </p>
        <div className="flex items-center justify-start">
          <p className="text-lg font-bold me-3">Attendees:</p>
          <div className="overflow-hidden w-[14%] h-full rounded-full">
            <img
              className="h-full w-full"
              src={artists.map((attendance) => {
                return attendance.artistPhoto;
              })}
              alt=""
            />
          </div>
        </div>
        <a
          href="/details"
          className="shadow-xl mt-4 me-4 py-3 px-6 bg-black text-white rounded-full hover:scale-95 hover:text-[#67f7e6] transition-all duration-500"
        >
          Buy a Ticket
        </a>
      </div>
      <div className="w-16 h-16 z-10 rounded-full shadow-xl bg-[#32847a] overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-100 sm:group-hover:scale-125">
        <img
          className="object-cover h-full w-full"
          src={artists[0].artistPhoto}
          alt=""
        />{" "}
      </div>
      <div className="ms-2 sm:ms-0 sm:group-hover:opacity-0 group-hover:opacity-100 transition-all duration-500">
        <h2 className="text-lg sm:text-2xl font-bold capitalize">
          {eventName}
        </h2>
        <div className="text-sm sm:text-md font-bold"> {eventHour} </div>
      </div>
    </div>
  );
};

export default TimelineElement;
