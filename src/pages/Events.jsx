import React, { useCallback, useEffect, useState } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useParams } from "react-router-dom";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderMenu from "../components/Header/HeaderMenu";

const Events = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const { categoryName } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (category === "") {
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
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      <FilterCategories
        events={eventsWithArtists}
        clickedCategory={categoryName}
        onSelectCategory={handleCategorySelect}
      />
      <div className="my-4 font-bold text-4xl text-[#32847a]">
        INCOMING EVENTS
      </div>
      <EventsComp events={filteredEvents} categoryName={categoryName} />

    </>
  );
};

export default Events;
