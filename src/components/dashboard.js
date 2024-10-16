import React, { useState, useEffect } from 'react';
import AddItem from './add_item';
import UpdateItem from './update_item';
import RemoveItem from './remove_item';
import DisplayAllItem from './display_all';
import DisplayByCategory from './display_by_category';
import DisplayLowStockItem from './display_low';
import SearchItem from './search_item';
import SortItem from './sort_item';
import './dashboard.css';

const Dashboard = () => {
  const [itemList, setItemList] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);

  // the json thing
  useEffect(() => {
    const storedItems = localStorage.getItem('itemList');
    if (storedItems) {
      setItemList(JSON.parse(storedItems));
    }
  }, []);

  // save to json, thing
  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }, [itemList]);


  const handleAddItem = (newItem) => {
    // Check for same id
    const duplicate = itemList.find((item) => item.id === newItem.id);
    if (duplicate) {
      return { success: false, message: 'ID already exists. Please use a unique ID.' };
    }

    setItemList((prevItemList) => [...prevItemList, newItem]);
    return { success: true, message: 'Item added successfully!' };
  };

  const handleRemoveItem = (id) => {
    const itemToRemove = itemList.find((item) => item.id === id);
    if (itemToRemove) {
      setItemList((prevItemList) => prevItemList.filter((item) => item.id !== id));
      return { success: true, name: itemToRemove.name };
    }
    return { success: false };
  };

  const handleUpdateItem = (id, field, newValue) => {
    const itemIndex = itemList.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedItemList = [...itemList];
      const oldValue = updatedItemList[itemIndex][field];
      updatedItemList[itemIndex][field] = newValue;
      setItemList(updatedItemList);
      return {
        success: true,
        name: updatedItemList[itemIndex].name,
        field: field,
        oldValue: oldValue,
        newValue: newValue,
      };
    }
    return { success: false };
  };

  const handleSearchItem = (id) => {
    const item = itemList.find((item) => item.id === id);
    if (item) {
      return { success: true, item };
    }
    return { success: false };
  };

  const handleSortItem = (sortBy, order) => {
    const sortedList = [...itemList].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === 'Ascending' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === 'Ascending' ? 1 : -1;
      return 0;
    });
    setItemList(sortedList);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddItem onAdd={handleAddItem} />;
      case 'update':
        return <UpdateItem onUpdate={handleUpdateItem} />;
      case 'remove':
        return <RemoveItem onRemove={handleRemoveItem} />;
      case 'search':
        return <SearchItem onSearch={handleSearchItem} />;
      case 'sort':
        return <SortItem onSort={handleSortItem} itemList={itemList} />;
      case 'display_all':
        return <DisplayAllItem itemList={itemList} />;
      case 'display_by_category':
        return <DisplayByCategory itemList={itemList} />;
      case 'display_low_stock':
        return <DisplayLowStockItem itemList={itemList} />;
      default:
        return 
    }
  };

  return (
    <div className="dashboard">
      <header>
      <h1>Inventory Management Dashboard</h1>
      </header>

      <div className="button-group">
        <button className="action" onClick={() => setActiveComponent('add')}>
          Add Item
        </button>
        <button className="action" onClick={() => setActiveComponent('update')}>
          Update Item
        </button>
        <button className="action" onClick={() => setActiveComponent('remove')}>
          Remove Item
        </button>
        <button className="action" onClick={() => setActiveComponent('search')}>
          Search Item
        </button>
        <button className="action" onClick={() => setActiveComponent('sort')}>
          Sort Items
        </button>
        <button className="action" onClick={() => setActiveComponent('display_all')}>
          Display All Items
        </button>
        <button className="action" onClick={() => setActiveComponent('display_by_category')}>
          Display by Category
        </button>
        <button className="action" onClick={() => setActiveComponent('display_low_stock')}>
          Display Low Stock 
        </button>
      </div>
      
      <div className="active-component">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
