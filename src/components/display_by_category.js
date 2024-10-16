import React, { useState } from 'react';

const DisplayByCategory = ({ itemList }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const Categories = [...new Set(itemList.map((item) => item.category))];

  const handleDisplay = () => {
    if (!selectedCategory) return;
    const items = itemList.filter((item) => item.category === selectedCategory);
    setFilteredItems(items);
  };

  return (
    <div className="section">
      <h2>Display Items by Category</h2>
      <div className="form-group">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select-field"
        >
          <option value="">--Select Category--</option>
          {Categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="button secondary-button" onClick={handleDisplay}>
          Display
        </button>
      </div>
      {selectedCategory && (
        <>
          {filteredItems.length > 0 && (
            <table className="item-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price ($)</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayByCategory;
