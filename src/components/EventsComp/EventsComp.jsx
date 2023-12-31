import React, { useEffect } from "react";
import EventsCard from "./EventsCard";
import { useDispatch } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";

const EventsComp = ({ events, path, categoryName }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toLocaleDateString("en-GB");
  };

  const compareDates = (date1, date2) => {
    const [day1, month1, year1] = date1.split("/");
    const [day2, month2, year2] = date2.split("/");

    if (year1 < year2) {
      return false;
    } else if (year1 > year2) {
      return true;
    } else {
      if (month1 < month2) {
        return false;
      } else if (month1 > month2) {
        return true;
      } else {
        if (day1 < day2) {
          return false;
        } else if (day1 > day2) {
          return true;
        } else {
          return true;
        }
      }
    }
  };

  const filteredByDate = events.filter((event) => {
    const eventDate = convertToDate(event.eventDate);
    const isPast = () => {
      if (path === "/pastevents") {
        return compareDates(formattedDate, eventDate);
        // return eventDate < formattedDate;
      } else {
        return compareDates(eventDate, formattedDate);
      }
    };
    return isPast();
  });

  const arr = [];
  filteredByDate.forEach((e) => {
    if (
      e.category.name === categoryName ||
      "All" === categoryName ||
      undefined === categoryName
    ) {
      arr.push(e);
    }
  });

  return (
    <div className="flex gap-8 justify-center items-center mt-8 mb-10 px-10 flex-wrap">
      {arr.map((event, i) => (
        <EventsCard key={i} event={event} path={path} />
      ))}
    </div>
  );
};

export default EventsComp;
