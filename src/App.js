import { useState } from "react";

export default function App() {
  const [item, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
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
      <PackingList items={item} onDeleteItems={handleDeleteItems} onToggleItem = {handleToggleItem} />
      <Stats item={item} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Travel Items 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, package: false, id: Date.now() };
    onAddItems(newItem);
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems , onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItems={onDeleteItems} onToggleItem={onToggleItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({item}) {

  if(!item.length)
    return(
  <p className="stats"><em>Add the items </em></p>
);
  
  const numItems = item.length;       
  const numPacked= item.filter((item)=>item.packed).length  
  const percentage = Math.round((numPacked/numItems)*100);
  
  return (
    <footer className="stats">
      <em> 
        {percentage ===100 ? "You are ready to move ":
       ` You have ${numItems} items on your list, you have already packed ${numPacked} (${percentage}%)`}
        </em>
    </footer>
  );
}

