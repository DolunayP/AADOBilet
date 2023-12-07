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

  const filteredByDate = events.filter((event) => {
    const eventDate = convertToDate(event.eventDate);
    const isPast = () => {
      if (path === "/pastevents") {
        return eventDate < formattedDate;
      } else {
        return eventDate >= formattedDate;
      }
    };
    return isPast();
  });
  const arr = []

  filteredByDate.map(e => {
    if (e.category.name === categoryName || 'All' === categoryName) {
      arr.push(e)
    }
  })

  console.log(arr)
  return (
    <div className="flex gap-8 justify-center items-center my-12 px-10 flex-wrap">
      {arr.map((event, i) => (
        <EventsCard key={i} event={event} />
      ))}
    </div>
  );
};

export default EventsComp;
