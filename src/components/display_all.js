import React from 'react';

function DisplayAllItem({ itemList }) {
  return (
    <div className="section">
      <h2>All Items</h2>
      {itemList.length === 0 ? (
        <p>No items to display.</p>
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
            {itemList.map((item) => (
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
}

export default DisplayAllItem;
