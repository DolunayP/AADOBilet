import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../redux/dataSlice";
import { useEffect } from "react";

function CategoriesItem({ category }) {
  const navigate = useNavigate();
  const goToEvents = (e) => {
    console.log("asdas", e);
    navigate(`events/${category}`);
  };

  return (
    <div
      onClick={(e) => {
        goToEvents(e);
      }}
      className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group"
    >
      <div className="absolute inset-0 bg-sports bg-cover "></div>
      <div className="absolute inset-0 bg-color-rose-ebony bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
      <p className="absolute group-hover: bg-opacity-90 tracking-widest">
        {category}
      </p>
    </div>
  );
}

export default CategoriesItem;
