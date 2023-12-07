// FilterCategories.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FilterCategories = ({ events, onSelectCategory, clickedCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "") {
      onSelectCategory("");
    }
  }, [selectedCategory, onSelectCategory]);

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(
      clickedCategory !== null && category === null ? clickedCategory : category
    );
    setIsSelected((select) => true);

    onSelectCategory(
      clickedCategory !== null && category === null
        ? clickedCategory
        : category === "All"
        ? ""
        : category
    );

    navigate(`/events/${category}`);
  };

  return (
    <div className="my-4">
      <label className="text-lg font-semibold me-2">Select a Category:</label>
      <select
        onChange={handleCategorySelect}
        value={
          clickedCategory !== null && isSelected === false
            ? clickedCategory
            : selectedCategory === ""
            ? "All"
            : selectedCategory
        }
        className="px-4 py-2 border rounded-lg w-[200px]"
      >
        <option value="All">All</option>
        {Array.from(new Set(events.map((event) => event.category.name))).map(
          (category, index) => (
            <option className="capitalize" key={index} value={category}>
              {category}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default FilterCategories;
