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

      <div className="  text-[52px] text-white  bg-gradient-to-b from-[#183f3b] to-[#358981] rounded-b-3xl  ">
        <span className="shadow-xl after:content-['|'] before:content-['|'] after:ml-5 before:mr-5 border-b-8 after:shadow-xl before:shadow-xl ">
          {path ? "PAST EVENT DETAILS" : "EVENT DETAILS"}
        </span>
      </div>
      <DetailsComp id={id} path={path} />
      <SliderComp />
      <Footer />
    </>
  );
};

export default Details;
