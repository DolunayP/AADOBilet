function Seats({ seat, onSelect, showImage, onBuyTicket }) {
  // useEffect(() => {
  //   dispatch(getSeatsByEvent(seat.eventId));
  // }, [dispatch, seat.eventId]);

  function handleSelectSeat(seatId) {
    onSelect(seatId);

    showImage(seat.eventId);
  }

  function getHoverColor(category) {
    switch (category) {
      case "VIP":
        return "hover:bg-red-400";
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
          "bg-red-600"
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
          seat.ticketPricing &&
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
