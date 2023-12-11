import React, { useEffect } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import { useDispatch, useSelector } from "react-redux";
import {
  buyTicketOfEvent,
  getArtistWithEvents,
  getPhotosByEvent,
  getSeatsByEvent,
  getTickets,
  selectSeatByUser,
} from "../redux/dataSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderMenu from "../components/Header/HeaderMenu";
import HeaderTitle from "../components/Header/HeaderTitle";
import Seats from "../components/SeatsComp/Seats";
import { getEventPhotos } from "../backend/app";
import Footer from "../components/FooterComp/Footer";

const Tickets = () => {
  const { seats, eventTickets } = useSelector((state) => state.data);
  const { selectedSeat, eventPhotos } = useSelector((state) => state.data);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  function getBackgroundColor(category) {
    switch (category) {
      case "VIP":
        return "bg-red-600";
      case "Normal":
        return "bg-orange-600";
      case "Öğrenci":
        return "bg-green-400";
      default:
        return "";
    }
  }

  function onSelectSeat(seatId) {
    console.log("event", eventPhotos);
    dispatch(selectSeatByUser(seatId));
  }

  function onShowImage(eventId) {
    dispatch(getPhotosByEvent(eventId));
  }

  function handleBuyTicket(seatId) {
    console.log("selectedSeat", selectedSeat);
    console.log(
      `eventId: ${selectedSeat.events.id} seatId: ${selectedSeat.id} ticketId: ${selectedSeat.ticketPricing.id}`
    );
    dispatch(
      buyTicketOfEvent({
        eventId: selectedSeat.events.id,
        seatId: selectedSeat.id,
        ticketId: selectedSeat.ticketPricing.id,
      })
    );
    setTimeout(() => {
      window.location.href = "/event/ticket/success";
    }, 1000);
    //dispatch(getSeatsByEvent(seat.eventId));
  }

  useEffect(() => {
    dispatch(getSeatsByEvent(id));
    dispatch(getTickets(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      <h2 className="text-4xl p-3 ">Select Seat!</h2>

      <div className="grid grid-cols-4">
        <div className="  bg-[#f7f2f2] rounded-md col-start-2 col-span-2 shadow-lg">
          <div className="bg-white  m-8 rounded-md p-4">
            {seats.map((seat) => (
              <Seats
                seat={seat}
                key={seat.id}
                onSelect={onSelectSeat}
                showImage={onShowImage}
                onBuyTicket={handleBuyTicket}
              />
            ))}
          </div>
        </div>
      </div>

      {Object.keys(selectedSeat).length > 0 && (
        <>
          <div className="mt-24">
            <h2 className="text-4xl mb-4">Ticket Infos</h2>
          </div>

          <div className="flex justify-center items-center mb-16">
            <div className="bg-white h-80  items-center">
              <div className="grid grid-cols-4 col-start-2 col-end-4 items-center p-2 shadow-lg rounded-lg">
                <div className="p-3 bg-gray-200 rounded-lg">Selected Seat </div>
                <div
                  className={`${getBackgroundColor(
                    selectedSeat.ticketPricing.ticketCategories.categoryName
                  )} p-3 rounded-xl text-white`}
                >
                  {selectedSeat.seatName}
                </div>
              </div>

              <div className="grid grid-cols-4 col-start-2 col-end-4 justify-center items-center shadow-lg p-2 rounded-lg">
                <div className="p-3 bg-gray-200 rounded-lg">Category </div>
                <div
                  className={`${getBackgroundColor(
                    selectedSeat.ticketPricing.ticketCategories.categoryName
                  )} p-3 rounded-xl text-white`}
                >
                  {selectedSeat.ticketPricing.ticketCategories.categoryName}
                </div>
              </div>

              <div className="grid grid-cols-4 col-start-2 col-end-4 items-center shadow-lg p-2 rounded-lg">
                <div className="p-3 bg-gray-200 rounded-lg">Price </div>
                <div
                  className={`${getBackgroundColor(
                    selectedSeat.ticketPricing.ticketCategories.categoryName
                  )} p-3 rounded-xl text-white`}
                >
                  {selectedSeat.ticketPricing.ticketCategories.price} ₺
                </div>
              </div>

              <div className="grid grid-cols-4 col-start-2 col-end-4 items-center shadow-lg p-2 rounded-lg">
                <div className="p-3 bg-gray-200 rounded-lg">Event Name </div>
                <div
                  className={`${getBackgroundColor(
                    selectedSeat.ticketPricing.ticketCategories.categoryName
                  )} p-3 rounded-xl text-white`}
                >
                  {selectedSeat.events.eventName} ₺
                </div>
              </div>

              <div className="flex justify-between items-center m-2">
                <div className="p-3 rounded-lg text-2xl justify-self-center tracking-wider ">
                  Ready to go!
                </div>
                <button
                  className="bg-white border-x-white text-color-primary p-4 rounded-lg shadow-2xl border hover:bg-color-myrtle-green transition-all duration-200 hover:text-white ml-auto"
                  onClick={handleBuyTicket}
                >
                  Buy Ticket
                </button>
              </div>
            </div>

            <div className=" p-2 rounded-lg shadow-lg shadow-slate-700">
              {eventPhotos && eventPhotos.length > 0 && (
                <img
                  className="col-start-4 col-span-2 row-start-2 w-[573px] "
                  src={eventPhotos[0].eventPhoto}
                  alt={eventPhotos[0].id}
                />
              )}
            </div>
          </div>
        </>
      )}

      <div>
        {/* {eventTickets.map((ticket) => (
          <Seats ticket={ticket} key={ticket.id} />
        ))} */}
      </div>
      <Footer />
    </>
  );
};

export default Tickets;
