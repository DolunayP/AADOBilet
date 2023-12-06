import { useNavigate } from "react-router-dom";

function CategoriesItem({ category }) {
  const navigate = useNavigate();
  const goToEvents = (e) => {
    navigate(
      `events/${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`
    );
  };

  return (
    <div
      onClick={(e) => {
        goToEvents(e);
      }}
      className=" w-11/12 h-60 relative flex justify-center items-center cursor-pointer group"
    >
      <img
        src={category.image}
        alt="img"
        className="absolute inset-0 bg-cover"
      />
      <div className="absolute inset-0 bg-color-rose-ebony bg-opacity-90 group-hover:bg-opacity-70 transition duration-300"></div>
      <p className="absolute group-hover: bg-opacity-90 tracking-widest">
        {category.name}
      </p>
    </div>
  );
}

export default CategoriesItem;
