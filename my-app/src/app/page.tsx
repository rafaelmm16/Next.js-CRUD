"use client";

import { useState } from 'react';
import Input from './input'; // Importa o componente Input
import Button from './add-button';
import Loading from './loading'; // Importa o componente Loading

interface Item {
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    setIsLoading(true); // Inicia o loading

    if (newItem.name && newItem.description) {
      // Simula um atraso para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 1000)); 

      setItems([...items, newItem]);
      setNewItem({ name: '', description: '' });
    }

    setIsLoading(false); // Finaliza o loading
  };

  const editItem = (item: Item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
  };

  const updateItem = async () => {
    setIsLoading(true); // Inicia o loading

    if (newItem.name && newItem.description) {
      // Simula um atraso para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const updatedItems = items.map((item) =>
        item === editingItem ? newItem : item
      );
      setItems(updatedItems);
      setEditingItem(null);
      setNewItem({ name: '', description: '' });
    }

    setIsLoading(false); // Finaliza o loading
  };

  const deleteItem = (item: Item) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 mb-8 w-full">
        <h1 className="text-2xl font-bold text-center">CRUD Example (No Database)</h1>
      </header>

      {/* Loader */}
      {isLoading && <Loading />} 

      {/* Input Form */}
      <div className="mb-4 flex items-center">
        <div className="flex flex-col mb-2 space-y-2"> {/*  Wrap inputs in a flex container */}
          {/* Usar o componente Input para as caixas de texto */}
          <Input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
          <Input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} />
        </div>
        <div className="ml-14"> {/* Adicione um espaço para a direita */}
          {/*  Button */}
          {editingItem ? (
            <button
              onClick={updateItem}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Update
            </button>
          ) : (
            <Button onClick={addItem}>
              <span className="text">Add</span>
            </Button>
          )}
        </div>
      </div>

      {/* Item List */}
      <ul className="w-full">
        {items.map((item, index) => (
          <li
            key={index}
            className="border p-2 mb-2 flex justify-between w-full"
          >
            <div>
              <span className="font-bold">{item.name}</span>: {item.description}
            </div>
            <div>
              <button
                onClick={() => editItem(item)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
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