import React from "react";
import SliderComp from "../components/slidercomp/SliderComp";
import DetailsComp from "../components/DetailsComp/DetailsComp";
import { useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Footer from "../components/FooterComp/Footer";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineEnter } from "react-icons/ai";

const SuccessBuyTicket = () => {
  const { id } = useParams();

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      <div className="flex justify-center">
        <div className="bg-color-davys-gray flex justify-center items-center p-4 m-5 rounded-xl flex-col w-[1000px]">
          {" "}
          <h1 className="text-white text-3xl mb-10">
            Ticket purchased successfully{" "}
          </h1>
          <AiOutlineCheckCircle size={120} color={`green`} />
          <div className="flex self-end">
            <button
              className="text-lg text-white flex items-center gap-4 hover:text-opacity-50 transition-all duration-200"
              onClick={() => (window.location.href = "/")}
            >
              <span>
                <AiOutlineEnter />
              </span>{" "}
              Back To Home Page
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessBuyTicket;
