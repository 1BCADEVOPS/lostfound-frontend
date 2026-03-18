import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lost & Found System</h1>
        <p className="app-subtitle">Report items and keep track of what has been lost or found.</p>
      </header>
      <main className="app-main">
        <AddItem fetchItems={fetchItems} />
        <ItemList items={items} fetchItems={fetchItems} />
      </main>
    </div>
  );
}

export default App;