import { useState } from "react";
import Logo from "./Logo"
import Form from "./Form"
import PackingList  from "./PackingList";
import  Stats  from "./Stats";

export default function App() {
  const [item, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }
    function handleClear(){
      const confirmed = window.confirm("Do you want to clear the lsit ");
      if(confirmed)setItems([]);
    }
  function handleDeleteItems(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => item.id === id ? 
      { ...item,packed: !item.packed} : item) 
    );
  }


  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
      items={item} 
      onDeleteItems={handleDeleteItems} 
      onToggleItem = {handleToggleItem} 
      onClearItem = {handleClear} />
      <Stats item={item} />
    </div>
  );
}

