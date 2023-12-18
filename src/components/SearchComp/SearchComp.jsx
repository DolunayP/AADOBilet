import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../../redux/dataSlice";
import EventsComp from "../EventsComp/EventsComp";

const SearchComp = ({ word, date, place }) => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [searchedEvents, setSearchedEvents] = useState([]);

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);
  useEffect(() => {
    // DatePicker tarafından gelen tarihi database formatına çevirme
    const datePickerToDatabaseFormat = (datePickerDate) => {
      const [year, month, day] = datePickerDate.split("-");
      const databaseFormatDate = `${day}.${month}.${year}`;
      return databaseFormatDate;
    };

    const filteredEvents = eventsWithArtists.filter((event) => {
      const eventName = event.eventName.toLowerCase();
      const eventDate = datePickerToDatabaseFormat(date);
      const eventLocation = event.eventLocation.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const matchesWord = word ? eventName.includes(word.toLowerCase()) : true;
      const matchesDate = date ? eventDate === event.eventDate : true;
      const matchesPlace = place ? eventLocation.includes(place.toLowerCase()) : true;

      return matchesWord && matchesDate && matchesPlace;
    });

    setSearchedEvents(filteredEvents);
  }, [word, date, eventsWithArtists, place]);

  return (
    <>
      <EventsComp events={searchedEvents} />
    </>
  );
};

export default SearchComp;
