import React, { useEffect, useState } from "react";
import SliderCard from "./SliderCard";
import bg from "../../assets/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents, getData } from "../../redux/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SliderComp = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  return (
    <div className="relative h-full w-full mt-8 mb-14">
      <h2 className="mt-2 mb-6 font-bold text-[48px] text-[#296c60]">
        Yaklaşan Popüler Etkinlikler
      </h2>
      <img className="absolute top-0 left-0 h-full w-full" src={bg} alt="" />
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper !py-[40px]"
      >
        {eventsWithArtists.map((events, i) => {
          return (
            <SwiperSlide>
              <SliderCard events={events} key={i} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderComp;
