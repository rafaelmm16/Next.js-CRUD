"use client";

import { useState, useEffect } from 'react';
import Input from './components/input';
import Button from './components/add-button';
import Loading from './components/loading';
import DeleteButton from './components/delete-button';
import EditButton from './components/edit-button';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

interface Item {
  id: string; // Add ID field
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ id: '', name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Current editing item:', editingItem);
  }, [editingItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    setIsLoading(true);

    if (newItem.name && newItem.description) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setItems([...items, { ...newItem, id: uuidv4() }]); // Generate ID
      setNewItem({ id: '', name: '', description: '' });
    }

    setIsLoading(false);
  };

  const editItem = (item: Item) => {
    setEditingItem(item);
    setNewItem({ ...item });
  };

  const updateItem = async () => {
    setIsLoading(true);

    if (newItem.name && newItem.description) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const updatedItems = items.map((item) =>
        item.id === editingItem?.id ? newItem : item // Compare IDs
      );
      setItems(updatedItems);
      setEditingItem(null);
      setNewItem({ id: '', name: '', description: '' });
    }

    setIsLoading(false);
  };

  const deleteItem = (item: Item) => {
    const updatedItems = items.filter((i) => i.id !== item.id); // Filter by ID
    setItems(updatedItems);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <header className="bg-gray-800 text-white py-4 mb-8 w-full">
        <h1 className="text-2xl font-bold text-center">CRUD Example (No Database)</h1>
      </header>

      <div className="mb-4 flex items-center">
        <div className="flex flex-col mb-2 space-y-2">
        <Input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
        <Input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} />
        </div>
        <div className="ml-14">
          {editingItem ? (
            <button onClick={updateItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
              Update
            </button>
          ) : (
            <Button onClick={addItem}>
              <span className="text">Add</span>
            </Button>
          )}
        </div>
      </div>

      <div className="mb-4">
        {isLoading && <Loading />}
      </div>


      <ul className="w-full">
        {items.map((item) => (
          <li key={item.id} className="border p-2 mb-2 flex justify-between w-full"> {/* Use item.id as key */}
            <div>
              <span className="font-bold">{item.name}</span>: {item.description}
            </div>
            <div className="flex gap-2">
              <EditButton onClick={() => editItem(item)} />
              <DeleteButton onClick={() => deleteItem(item)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}