import React, { useState } from 'react';

function AddItem({ onAdd }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // for validation stuff
  const [errors, setErrors] = useState({}); 

  const alphanumericRegex = /^[A-Za-z0-9]+$/; //only alphanumeric

  const validateInputs = () => {
    const newErrors = {};

    if (!alphanumericRegex.test(id)) {
      newErrors.id = 'ID must contain only letters and numbers.';
    }

    if (!alphanumericRegex.test(name)) {
      newErrors.name = 'Name must contain only letters and numbers.';
    }

    if (quantity === '' || isNaN(quantity) || Number(quantity) < 0) {
      newErrors.quantity = 'Please enter a valid number for Quantity.';
    }

    if (price === '' || isNaN(price) || Number(price) < 0) {
      newErrors.price = 'Please enter a valid number for Price.';
    }

    setErrors(newErrors);

    // yes if no errrors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setMessage('There was an issue');
      setMessageType('error');
      return;
    }

    // create a new object
    const newItem = {
      id: id.trim(),
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price),
      category,
    };


    const result = onAdd(newItem);
    if (result.success) {
      setMessage(result.message);
      setMessageType('success');

      setId('');
      setName('');
      setQuantity('');
      setPrice('');
      setCategory('Electronics');
      setErrors({});
    } else {
      setMessage(result.message);
      setMessageType('error');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="section">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          {/* ID */}
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={id}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            className="input-field"
            required
          />
          {errors.id && <p className="error-message">{errors.id}</p>}

          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          {/* Quantity */}
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className="input-field"
            min="0"
            required
          />
          {errors.quantity && <p className="error-message">{errors.quantity}</p>}

          {/* Price */}
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            className="input-field"
            min="0"
            step="0.01"
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}

          {/* Category */}
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-field"
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Clothing">Clothing</option>
            <option value="Stationery">Stationery</option>
            <option value="Others">Others</option>
          </select>

          {/* Submit */}
          <button type="submit">Add Item</button>
        </div>
      </form>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}

export default AddItem;
