// src/components/remove_item.js
import React, { useState } from 'react';

function RemoveItem({ onRemove }) {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleRemove = (e) => {
    e.preventDefault();

    // Call onRemove and handle response
    const result = onRemove(id.trim());
    if (result.success) {
      setMessage(`Item "${result.name}" has been removed from the inventory.`);
      setMessageType('success');
    } else {
      setMessage('Item not found!');
      setMessageType('error');
    }

    // Clear input
    setId('');

    // Remove message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="section">
      <h2>Remove Item</h2>
      <form onSubmit={handleRemove}>
        <div className="form-group">
          <input
            type="text"
            value={id}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="button error-button">
            Remove Item
          </button>
        </div>
      </form>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}

export default RemoveItem;
