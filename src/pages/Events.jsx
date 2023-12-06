import React, { useCallback, useEffect, useState } from "react";
import HeaderView from "../components/Header/HeaderView";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/dataSlice";
import { useParams } from "react-router-dom";

const Events = () => {
  const { events } = useSelector((state) => state.data);
  const { categoryName } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

  const dispatch = useDispatch();

  // const filterEvents = useCallback(() => {
  //   let filtered = [];

  //   filtered = events.filter((event) => event.eventCategory === categoryName);
  //   console.log(filtered, "-", events);

  //   if (!isEqual(filteredEvents, filtered)) {
  //     console.log("eşit değil");
  //     setFilteredEvents(filtered);
  //   } else return;
  // }, []);

  // useEffect(() => {
  //   filterEvents();
  // }, [filterEvents]);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (categoryName && category === null) {
      setFilteredEvents((prev) => []);
    } else if (category === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) => event.eventCategory === category
      );

      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <HeaderView />
      <FilterCategories
        events={events}
        clickedCategory={categoryName}
        onSelectCategory={handleCategorySelect}
      />
      <div className="my-4 font-bold text-4xl text-[#32847a]">
        INCOMING EVENTS
      </div>
      <EventsComp events={filteredEvents} />
    </>
  );
};

export default Events;
