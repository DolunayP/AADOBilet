import React, { useEffect } from "react";
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getEventSingle, getPhotosByEvent } from "../../redux/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DetailsSlider from "./DetailsSlider";
import { useNavigate } from "react-router-dom";

const DetailsComp = ({ id }) => {
  const { event, eventPhotos } = useSelector((state) => state.data);
  const navigate = useNavigate();

  let artists = [];

  if (event.event) {
    artists = [...event.event.artists];
  }

  const artistImg = artists.map((artist) => artist.artistPhoto);
  const href = window.location.href;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventSingle(id));
    dispatch(getPhotosByEvent(id));
  }, [dispatch, href, id]);

  const handleFacebookShare = () => {
    // Facebook paylaşım URL'si
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleInstagramShare = () => {
    // Instagram paylaşım URL
    const instagramShareUrl = `https://www.instagram.com/share?url=${window.location.href}`;
    window.open(instagramShareUrl, "_blank");
  };
  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/share?url=${window.location.href}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      "Etkinlik: " + window.location.href
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };
  return (
    <>
      <div className="flex justify-between items-center px-[10%] gap-6">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper w-[500px] "
        >
          {eventPhotos?.map((photo, i) => {
            return (
              <SwiperSlide key={i}>
                <DetailsSlider key={i} photo={photo} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex flex-row-reverse">
          <div className="mx-auto ps-8 ">
            <img
              className="rounded-lg shadow-2xl w-[320px] h-auto"
              src={artistImg[0]}
              alt=""
            />
          </div>
          {event.event && (
            <div className="flex flex-col items-start justify-center max-w-[300px] ">
              <h2 className="text-xl text-left mb-2">
                Event:{" "}
                <span className="font-bold"> {event.event.eventName}</span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event Time:
                <span className="font-bold"> {event.event.eventHour}</span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event End Time:
                <span className="font-bold">
                  {" "}
                  {event.event.eventFinishHour}
                </span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Event Date:
                <span className="font-bold"> {event.event.eventDate}</span>
              </h2>
              <h2 className="text-xl text-left mb-2">
                Ticket Price:
                <span className="font-bold"> {event.event.ticketPrice} ₺</span>
              </h2>
              <p className="text-justify"> {event.event.eventDesc}</p>

              <button
                className="bg-color-secondary p-2 text-white border rounded-md mt-2"
                onClick={() => navigate(`/event/tickets/${event.event.id}`)}
              >
                Buy Ticket
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex px-[10%] justify-between items-center">
        <div className="text-2xl">google maps GELECEK</div>
        <div className="text-center flex flex-col items-center justify-center mt-8">
          <h2 className="font-bold text-3xl my-6">
            Share This Event on Social Media Platforms
          </h2>
          <div className="flex gap-8 text-base font-semibold">
            <button
              className="flex flex-col justify-center items-center"
              onClick={handleFacebookShare}
            >
              <FaFacebook size={38} />
              <div>Facebook'ta Paylaş</div>
            </button>
            <button
              className="flex flex-col justify-center items-center"
              onClick={handleInstagramShare}
            >
              <FaInstagram size={38} />
              <div>Instagram'da Paylaş</div>
            </button>
            <button
              className="flex flex-col justify-center items-center"
              onClick={handleTwitterShare}
            >
              <FaTwitter size={38} />
              <div>Twitter'da Paylaş</div>
            </button>
            <button
              className="flex flex-col justify-center items-center"
              onClick={handleWhatsAppShare}
            >
              <FaWhatsapp size={38} />
              <div>WhatsApp'ta Paylaş</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsComp;
