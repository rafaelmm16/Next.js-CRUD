"use client"; // Add this line
import { useState } from 'react';

interface Item {
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (newItem.name && newItem.description) {
      setItems([...items, newItem]);
      setNewItem({ name: '', description: '' });
    }
  };

  const editItem = (item: Item) => { // Specify item type
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
  };

  const updateItem = () => {
    if (newItem.name && newItem.description) {
      const updatedItems = items.map((item) =>
        item === editingItem ? newItem : item
      );
      setItems(updatedItems);
      setEditingItem(null);
      setNewItem({ name: '', description: '' });
    }
  };

  const deleteItem = (item: Item) => { // Specify item type
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
  };

  return (
      <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">CRUD Example (No Database)</h1>

          {/* Input Form */}
          <div className="mb-4">
              <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="border p-2 mr-2 text-black"
              />
              <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="border p-2 mr-2 text-black"
              />
              {editingItem ? (
                  <button onClick={updateItem} className="bg-blue-500 text-black p-2 rounded">
                      Update
                  </button>
              ) : (
                  <button onClick={addItem} className="bg-green-500 text-black p-2 rounded">
                      Add
                  </button>
              )}
          </div>

          {/* Item List */}
          <ul>
              {items.map((item, index) => (
                  <li key={index} className="border p-2 mb-2 flex justify-between">
                      <div>
                          <span className="font-bold">{item.name}</span>: {item.description}
                      </div>
                      <div>
                          <button
                              onClick={() => editItem(item)}
                              className="bg-yellow-500 text-black p-1 rounded mr-2"
                          >
                              Edit
                          </button>
                          <button
                              onClick={() => deleteItem(item)}
                              className="bg-red-500 text-black p-1 rounded"
                          >
                              Delete
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  );
}