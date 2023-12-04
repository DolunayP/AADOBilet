import AadoButton from "../AadoButton";
import { useState } from "react";

function HeaderForm() {
  //Event place
  const [eventInput, setEventInput] = useState("");
  const [placeInput, setPlaceInput] = useState("");

  //Date
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChangeEventName = (event) => {
    setEventInput(event.target.value);

    console.log(eventInput);
  };

  const handleChangePlaceName = (event) => {
    setPlaceInput(event.target.value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(selectedDate);
  };
  return (
    <div className="text-xs flex flex-col  sm:flex-row md:flex-row  sm:flex-wrap  md:flex-nowrap  space-x-2   mt-8 ml-5 sm:mt-14 sm:ml-24  md:ml-16  md:mr-8  ">
      <input
        //style={{ minWidth: "13rem" }}
        className=" w-5/6 lg:w-2/6 md:w-5/6 mb-2 ml-2  bg-color-secondary rounded-md pl-3 placeholder:text-gray-400 focus:outline-none text-gray-400 md: h-10 "
        onChange={handleChangeEventName}
        value={eventInput}
        type="text"
        placeholder="Type a event name..."
      ></input>
      <input
        // style={{ minWidth: "13rem" }}
        placeholder="date"
        type="date"
        onChange={handleChangeDate}
        className="md:mb-2   mb-2 w-5/6 lg:w-1/6 md:w-1/2 min-w-64  bg-color-secondary rounded-md pr-3 pl-3 placeholder:text-gray-400 focus:outline-none text-gray-400  md: h-10 "
      />
      <input
        // style={{ minWidth: "13rem" }}
        className=" w-5/6  mb-2 lg:w-1/6 md:w-1/2 min-w-64 bg-color-secondary rounded-md pl-3 placeholder:text-gray-400 focus:outline-none text-gray-400 md: h-10 "
        onChange={handleChangePlaceName}
        value={placeInput}
        type="text"
        placeholder="Type a place..."
      ></input>
      <AadoButton
        // style={{ minWidth: "13rem" }}
        primary
        className="flex justify-center w-5/6 md:w-1/2 lg:w-1/6 md: h-10 rounded-md pl-3  scale-100 focus:outline-none hover:bg-[#246059] transition-all duration-300 ease-in-out border-none active:scale-105"
      >
        Find a ticket
      </AadoButton>
      ;
    </div>
  );
}

export default HeaderForm;
