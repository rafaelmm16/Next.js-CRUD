"use client";

import { useState, useEffect } from 'react';
import Input from './components/input';
import Button from './components/add-button';
import Loading from './components/loading';
import DeleteButton from './components/delete-button';
import EditButton from './components/edit-button';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

interface Item {
  id: string;
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
      <motion.header
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 mb-8 w-full rounded-lg shadow-lg relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div> {/* Darken background */}
        <motion.h1
      className="text-3xl font-bold text-center relative z-10"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      CRUD Example (No Database)
    </motion.h1>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg blur-lg opacity-20 animate-pulse"
      style={{ transform: "translate(-5px, -5px)" }} // Slight offset for glow
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />

  </motion.header>

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