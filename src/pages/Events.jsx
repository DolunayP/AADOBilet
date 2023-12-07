import React, { useCallback, useEffect, useState } from "react";
import HeaderView from "../components/Header/HeaderView";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useParams } from "react-router-dom";

const Events = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const { categoryName } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

  const dispatch = useDispatch();

  const filterEvents = useCallback(() => {
    let filtered = [];

    setFilteredEvents(filtered);
  }, []);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (categoryName && category === null) {
      setFilteredEvents(null);
    } else if (category === "") {
      setFilteredEvents(eventsWithArtists);
    } else {
      const filtered = eventsWithArtists.filter(
        (event) => event.category.name === category
      );

      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <HeaderView />
      <FilterCategories
        events={eventsWithArtists}
        clickedCategory={categoryName}
        onSelectCategory={handleCategorySelect}
      />
      <div className="my-4 font-bold text-4xl text-[#32847a]">
        INCOMING EVENTS
      </div>
      <EventsComp events={filteredEvents} />
      <div></div>
    </>
  );
};

export default Events;
