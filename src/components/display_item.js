
import React, { useState } from 'react';

const DisplayItem = ({ itemList, onRemove }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [displayMode, setDisplayMode] = useState('all'); 


  const Categories = [...new Set(itemList.map(item => item.category))];

  const handleDisplayAll = () => {
    setDisplayMode('all');
    setFilterCategory('');
  };

  const handleDisplayByCategory = () => {
    setDisplayMode('category');
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Filter items based on the selected mode
  const filteredItems = displayMode === 'all'
    ? itemList
    : itemList.filter(item => item.category === filterCategory);

  return (
    <div className="section">
      <h2>Items List</h2>
      <div className="button-group">
        <button className="button secondary-button" onClick={handleDisplayAll}>
          Display All Items
        </button>
        <button className="button secondary-button" onClick={handleDisplayByCategory}>
          Display by Category
        </button>
      </div>
      {displayMode === 'category' && (
        <div className="filter-section">
          <label htmlFor="category-select">Select Category: </label>
          <select
            id="category-select"
            value={filterCategory}
            onChange={handleFilterChange}
            className="select-field"
          >
            <option value="">--Select--</option>
            {Categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}
      <ul>
        {filteredItems.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id}>
              {item.id} - {item.name} - {item.quantity} - ${item.price.toFixed(2)}
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DisplayItem;
