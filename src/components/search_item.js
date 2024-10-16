import React, { useState } from 'react';

const SearchItem = ({ onSearch }) => {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setMessage('Please enter an ID.');
      setResult(null);
      return;
    }

    const searchResult = onSearch(id.trim());
    if (searchResult.success) {
      setResult(searchResult.item);
      setMessage('');
    } else {
      setMessage('Item not found!');
      setResult(null);
    }

    // Clear input
    setId('');

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="section">
      <h2>Search Item</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            value={id}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="button primary-button">
            Search
          </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
      {result && (
        <div className="search-result">
          <h3>Item Details:</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Quantity:</strong> {result.quantity}</p>
          <p><strong>Price:</strong> ${result.price.toFixed(2)}</p>
          <p><strong>Category:</strong> {result.category}</p>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
