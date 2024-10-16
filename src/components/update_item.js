
import React, { useState } from 'react';

const UpdateItem = ({ onUpdate }) => {
  const [id, setId] = useState('');
  const [field, setField] = useState('quantity');
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    // validation thingi
    if (!id.trim() || newValue === '') {
      setMessage('All fields are required.');
      return;
    }

    const parsedId = id.trim();
    const parsedValue = field === 'quantity' ? parseInt(newValue, 10) : parseFloat(newValue);

    if (isNaN(parsedValue) || parsedValue < 0) {
      setMessage('Please enter a valid positive number for the new value.');
      return;
    }

    const result = onUpdate(parsedId, field, parsedValue);
    if (result.success) {
      setMessage(
        `${field.charAt(0).toUpperCase() + field.slice(1)} of Item "${result.name}" is updated from ${result.oldValue} to ${result.newValue}.`
      );
    } else {
      setMessage('Item not found!');
    }

    // Clear input
    setId('');
    setNewValue('');
    setField('quantity');

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="section">
      <h2>Update Item</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <input
            type="text"
            value={id}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            className="input-field"
            required
          />
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="select-field"
            required
          >
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
          <input
            type="number"
            value={newValue}
            placeholder="New Value"
            onChange={(e) => setNewValue(e.target.value)}
            className="input-field"
            min="0"
            step={field === 'price' ? '0.01' : '1'}
            required
          />
          <button type="submit" className="button warning-button">
            Update Item
          </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateItem;
