import { useState } from "react";

function HeaderForm({ word, setWord, date, setDate }) {
  const [placeInput, setPlaceInput] = useState("");

  const handleChangePlaceName = (event) => {
    setPlaceInput(event.target.value);
  };

  const handleChangeWord = (event) => {
    setWord(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="text-xs flex flex-col sm:flex-row gap-6 sm:flex-wrap md:flex-nowrap items-center justify-center pb-4 font-semibold sm:mt-10 ">
      <input
        className="w-5/6 lg:w-2/6 md:w-5/6 mb-2 text-lg bg-color-secondary rounded-md px-3 pt-2 pb-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
        onChange={handleChangeWord}
        value={word}
        type="text"
        placeholder="Type an event name..."
      ></input>
      <input
        placeholder="date"
        type="date"
        value={date}
        onChange={handleChangeDate}
        className="md:mb-2 mb-2 w-5/6 lg:w-1/6 md:w-1/2 min-w-[320px] text-lg bg-color-secondary pt-2 pb-3 rounded-md px-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
      />
      <input
        className=" w-5/6  mb-2 lg:w-1/6 md:w-1/2 min-w-[320px] text-lg bg-color-secondary pt-2 pb-3 rounded-md px-3 placeholder:text-gray-300 focus:outline-none text-gray-100"
        onChange={handleChangePlaceName}
        value={placeInput}
        type="text"
        placeholder="Type a place..."
      ></input>
    </div>
  );
}

export default HeaderForm;
