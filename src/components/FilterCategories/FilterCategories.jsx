// FilterCategories.js
import React, { useEffect, useState } from 'react';

const FilterCategories = ({ events, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory === '') {
      onSelectCategory('');
    }
  }, [selectedCategory, onSelectCategory]);

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onSelectCategory(category === 'All' ? '' : category);
  };

  return (
    <div className='my-4'>
      <label className='text-lg font-semibold me-2'>Select a Category:</label>
      <select
        onChange={handleCategorySelect}
        value={selectedCategory === '' ? 'All' : selectedCategory}
        className='px-4 py-2 border rounded-lg w-[200px]'
      >
        <option value='All'>All</option>
        {Array.from(new Set(events.map((event) => event.eventCategory))).map((category, index) => (
          <option className='capitalize' key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategories;
