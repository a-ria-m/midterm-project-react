// src/components/SortItem.js
import React, { useState } from 'react';

const SortItem = ({ itemList = [], onSort }) => {
  const [sortCriteria, setSortCriteria] = useState('quantity'); // 'quantity' or 'price'
  const [sortOrder, setSortOrder] = useState('ascending'); // 'ascending' or 'descending'
  const [sortedItems, setSortedItems] = useState([]);

  const handleSort = () => {
    if (!Array.isArray(itemList)) {
      console.error('itemList is not an array:', itemList);
      setSortedItems([]);
      return;
    }

    const sorted = [...itemList].sort((a, b) => {
      if (sortCriteria === 'quantity') {
        return sortOrder === 'ascending' ? a.quantity - b.quantity : b.quantity - a.quantity;
      } else if (sortCriteria === 'price') {
        return sortOrder === 'ascending' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setSortedItems(sorted);
    if (onSort) onSort(sorted); 
  };

  return (
    <div className="section">
      <h2>Sort Items</h2>
      <div className="form-group">
        <label htmlFor="sortCriteria">Sort by:</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="select-field"
        >
          <option value="quantity">Quantity</option>
          <option value="price">Price</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select-field"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>

        <button className="button" onClick={handleSort}>
          Sort
        </button>
      </div>

      {sortedItems.length > 0 && (
        <table className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price ($)</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan="5">No items to display.</td>
              </tr>
            ) : (
              sortedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default SortItem;
