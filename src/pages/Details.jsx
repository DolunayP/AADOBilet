import React from "react";
import SliderComp from "../components/slidercomp/SliderComp";
import DetailsComp from "../components/DetailsComp/DetailsComp";
import { useLocation, useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Footer from "../components/FooterComp/Footer";

const Details = () => {
  const { id } = useParams();
  const location = useLocation();

  const path = location.state;

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>

      <div className="text-[52px] text-white bg-gradient-to-b from-[#173633] to-[#07a696] rounded-b-full shadow-xl py-12 mb-6">
          {path ? "PAST EVENT DETAILS" : "EVENT DETAILS"}
      </div>
      <DetailsComp id={id} path={path} />
      <SliderComp />
      <Footer />
    </>
  );
};

export default Details;
