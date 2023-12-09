import React, { useEffect } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useLocation } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Footer from "../components/FooterComp/Footer";

const PastEvents = () => {
  const location = useLocation();
  const path = location.pathname;

  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);
  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      <div className="my-4 font-bold text-[52px] text-[#32847a]">
        Geçmiş Etkinlikler
      </div>
      <EventsComp events={eventsWithArtists} path={path} />
      <Footer />
    </>
  );
};

export default PastEvents;
