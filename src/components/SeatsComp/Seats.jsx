import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  buyTicketOfEvent,
  getSeatsByEvent,
  selectSeatByUser,
} from "../../redux/dataSlice";
import { getEventPhotos } from "../../backend/app";

function Seats({ seat, onSelect, showImage, onBuyTicket }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSeatsByEvent(seat.eventId));
  // }, [dispatch, seat.eventId]);

  function handleSelectSeat(seatId) {
    console.log("seatId", seatId);

    onSelect(seatId);

    showImage(seat.eventId);
  }

  function getHoverColor(category) {
    switch (category) {
      case "VIP":
        return "hover:bg-green-800";
      case "Normal":
        return "hover:bg-orange-800";
      case "Öğrenci":
        return "hover:bg-green-600";
      default:
        return "";
    }
  }

  return (
    <button
      disabled={!seat.availability}
      className="h-20"
      onClick={() => handleSelectSeat(seat.id)}
    >
      <div
        className={`${!seat.availability && "bg-gray-600"} ${
          seat.ticketPricing &&
          seat.ticketPricing.ticketCategories.categoryName === "VIP" &&
          "bg-green-600"
        } ${
          seat.ticketPricing &&
          seat.ticketPricing.ticketCategories.categoryName === "Normal" &&
          "bg-orange-600"
        } ${
          seat.ticketPricing &&
          seat.ticketPricing.ticketCategories.categoryName === "Öğrenci" &&
          "bg-green-400"
        } p-4 m-5 rounded-md text-white ${
          seat.availability &&
          `${getHoverColor(
            seat.ticketPricing.ticketCategories.categoryName
          )} transition-all duration-200`
        } w-16`}
      >
        {seat.seatName}
      </div>
    </button>
  );
}

export default Seats;
