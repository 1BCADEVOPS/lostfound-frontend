import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:8080/api/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lost & Found System</h1>
      <AddItem fetchItems={fetchItems} />
      <ItemList items={items} fetchItems={fetchItems} />
    </div>
  );
}

export default App;
