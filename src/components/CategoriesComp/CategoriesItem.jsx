import { useNavigate } from "react-router-dom";

function CategoriesItem({ category,handleScrollToTop }) {
  const navigate = useNavigate();
  const goToEvents = () => {
    navigate(
      `events/${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`
    );
  };

  return (
    <div
      onClick={() => {
        goToEvents();
        handleScrollToTop();
      }}
      className="w-11/12 h-60 relative flex justify-center items-center cursor-pointer group"
    >
      <img
        src={category.image}
        alt="img"
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="absolute inset-0 bg-color-rose-ebony bg-opacity-70 group-hover:bg-opacity-30 transition-all duration-[600ms]"></div>
      <p className="absolute group-hover:scale-125 transition-all duration-[600ms] group-hover:font-bold tracking-widest">
        {category.name}
      </p>
    </div>
  );
}

export default CategoriesItem;
