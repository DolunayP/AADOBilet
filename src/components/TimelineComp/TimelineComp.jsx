import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import TimelineElement from "./TimelineElement";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";

const TimelineComp = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const currentDate = `${day}.${month}.${year}`;

  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  const todayEvents =
    eventsWithArtists.length > 0
      ? eventsWithArtists.filter((event) => event.eventDate === currentDate)
      : [];

  return (
    <div className="my-8 min-h-[600px] flex flex-col">
      <div className="flex gap-3 sm:gap-0 flex-col sm:flex-row items-center justify-between mb-8 sm:mb-24">
        <div className="sm:w-[200px] text-xl sm:text-3xl font-bold">
          | <span className="text-[#32847a]">Today's</span> Schedule
        </div>
        <div className="sm:w-[200px] text-md sm:text-2xl font-bold justify-center flex items-center">
          <AiFillCalendar className="me-3 w-6 h-6 sm:h-11 sm:w-11" />{" "}
          <span className="text-[#32847a]">{day}</span>/{month}/{year}
        </div>
        <div className="sm:w-[200px] font-bold text-lg sm:text-3xl sm:text-start">
          {" "}
          <a href="">
            <span className="text-[#32847a]">|</span> See All
            <span
              className="t {/* {filter.map((e, i) => (
              <TimelineElement key={i} event={e} />
            ))}ext-[#32847a]"
            >
              Events
            </span>
          </a>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="sm:w-[86%] relative sm:flex justify-between sm:m-auto">
          <div className="w-[4px] sm:w-[90%] sm:translate-x-[-50%] bg-black bottom-[50%] sm:translate-y-0 translate-y-[50%] h-[78%] sm:h-[4px] absolute sm:bottom-20 z-0 left-[15%] sm:left-[50%]"></div>
          {eventsWithArtists.length > 0 && todayEvents.length > 0 ? (
            todayEvents.map((e, i) => <TimelineElement key={i} event={e} />)
          ) : (
            <h1>loading.....</h1>
          )}
          {/* {eventsWithArtists
              .filter((event) => event.eventDate === currentDate)
              .map((e, i) => {
                return <TimelineElement key={i} event={e} />;
              })}  */}
        </div>
        {/* {todayEvents.length > 0 ? (
            todayEvents.map((event, i) => {
              return <TimelineElement key={i} event={event} />;
            })
          ) : (
            <div> loading.. </div>
          )} */}

      </div>
    </div>
  );
};

export default TimelineComp;
