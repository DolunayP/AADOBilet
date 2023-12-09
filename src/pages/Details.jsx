import React from "react";
import SliderComp from "../components/slidercomp/SliderComp";
import DetailsComp from "../components/DetailsComp/DetailsComp";
import { useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Footer from "../components/FooterComp/Footer";

const Details = () => {
  const { id } = useParams();

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      <div className="font-bold text-center text-[44px] text-[#32847a] mt-4">
        EVENT DETAILS
      </div>
      <DetailsComp id={id} />
      <SliderComp />
      <Footer />
    </>
  );
};

export default Details;
