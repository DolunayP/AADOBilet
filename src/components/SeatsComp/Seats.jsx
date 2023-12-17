function Seats({ seat, onSelect, showImage, onBuyTicket }) {
  // useEffect(() => {
  //   dispatch(getSeatsByEvent(seat.eventId));
  // }, [dispatch, seat.eventId]);

  function handleSelectSeat(seatId) {
    onSelect(seatId);

    showImage(seat.eventId);
  }

  function getBackgroundColor(category) {
    switch (category) {
      case "VIP":
        return "bg-red-600";
      case "Normal":
        return "bg-orange-600";
      case "Öğrenci":
        return "bg-green-400";
      default:
        return "bg-blue-400";
    }
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
        return "hover:bg-blue-600";
    }
  }

  return (
    <button
      disabled={seat.status === "SOLD"}
      className="h-20"
      onClick={() => handleSelectSeat(seat.id)}
    >
      <div
        className={`${!seat.availability && "bg-gray-600"} ${
          seat.ticketPricing &&
          getBackgroundColor(seat.ticketPricing.ticketCategories.categoryName)
        } ${
          seat.ticketPricing &&
          getBackgroundColor(seat.ticketPricing.ticketCategories.categoryName)
        } ${
          seat.ticketPricing &&
          getBackgroundColor(seat.ticketPricing.ticketCategories.categoryName)
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
