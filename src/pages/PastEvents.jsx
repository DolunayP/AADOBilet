import React, { useEffect } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useLocation } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Footer from "../components/FooterComp/Footer";
import { HashLoader } from "react-spinners";

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
      <div className="text-[52px] text-white bg-gradient-to-b from-[#173633] to-[#07a696] rounded-b-full shadow-xl py-12 mb-6">
          Past Events
      </div>
      {eventsWithArtists.length > 0 ? (
        <EventsComp events={eventsWithArtists} path={path} />
      ) : (
        <div className="flex justify-center">
          <HashLoader size={75} color="#32847a" />
        </div>
      )}
      <Footer />
    </>
  );
};

export default PastEvents;
