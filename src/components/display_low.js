
import React from 'react';

const DisplayLowStock = ({ itemList }) => {
  const lowStockItems = itemList.filter((item) => item.quantity <= 5);

  return (
    <div className="section">
      <h2>Low Stock Items</h2>
      {lowStockItems.length === 0 ? (
        <p>No low stock items.</p>
      ) : (
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
            {lowStockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayLowStock;
