"use client";

import { useState } from 'react';
import Input from './input';
import Button from './add-button';
import Loading from './loading';
import DeleteButton from './delete-button';
import EditButton from './edit-button';

interface Item {
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    setIsLoading(true);

    if (newItem.name && newItem.description) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setItems([...items, newItem]);
      setNewItem({ name: '', description: '' });
    }

    setIsLoading(false);
  };

  const editItem = (item: Item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
  };

  const updateItem = async () => {
    setIsLoading(true);

    if (newItem.name && newItem.description) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const updatedItems = items.map((item) =>
        item === editingItem ? newItem : item
      );
      setItems(updatedItems);
      setEditingItem(null);
      setNewItem({ name: '', description: '' });
    }

    setIsLoading(false);
  };

  const deleteItem = (item: Item) => {
    const updatedItems = items.filter((i) => i !== item);
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

      {/* Loading abaixo dos inputs */}
      <div className="mb-4"> {/* Adiciona espaço abaixo dos inputs */}
        {isLoading && <Loading />}
      </div>


      <ul className="w-full">
        {items.map((item, index) => (
          <li key={index} className="border p-2 mb-2 flex justify-between w-full">
            <div>
              <span className="font-bold">{item.name}</span>: {item.description}
            </div>
            <div>
              {/* Use the imported EditButton component */}
              <EditButton onClick={() => editItem(item)} />

              <DeleteButton onClick={() => deleteItem(item)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}