"use client";

import { useState, useEffect } from 'react';
import Input from './components/input';
import Button from './components/add-button';
import Loading from './components/loading';
import DeleteButton from './components/delete-button';
import EditButton from './components/edit-button';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './components/modal';
import Search from './components/search';
import Update from './components/update';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    setIsLoading(true);

    if (!newItem.name.trim() || !newItem.description.trim()) {
      toast.error("Name and description cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (/[^a-zA-Z0-9\s]/.test(newItem.name) || /[^a-zA-Z0-9\s]/.test(newItem.description)) {
      toast.error("Invalid characters in name or description.");
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setItems([...items, { ...newItem, id: uuidv4() }]);
    setNewItem({ id: '', name: '', description: '' });
    setIsLoading(false);
    toast.success("Item added!");
  };

  const editItem = (item: Item) => {
    setEditingItem(item);
    setNewItem({ ...item }); // Populate input fields directly
  };

  const updateItem = () => {
    if (!newItem.name.trim() || !newItem.description.trim()) {
      toast.error("Name and description cannot be empty.");
      return;
    }

    if (/[^a-zA-Z0-9\s]/.test(newItem.name) || /[^a-zA-Z0-9\s]/.test(newItem.description)) {
      toast.error("Invalid characters in name or description.");
      return;
    }

    // Show confirmation modal before updating
    setModalType('edit');
    setShowModal(true); 
  };

  const handleConfirmUpdate = () => { // Function to execute after confirmation
    const updatedItems = items.map((item) =>
      item.id === editingItem?.id ? newItem : item
    );
    setItems(updatedItems);
    setEditingItem(null);
    setNewItem({ id: '', name: '', description: '' });
    closeModal();
    toast.success("Item updated!");
  };

  const confirmDelete = (item: Item) => {
    setItemToDelete(item);
    setModalType('delete');
    setShowModal(true);
  };

  const deleteItem = () => {
    if (itemToDelete) {
      const updatedItems = items.filter((i) => i.id !== itemToDelete.id);
      setItems(updatedItems);
      setItemToDelete(null);
      closeModal(); // Close modal after delete
      toast.success('Item deleted!');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setNewItem({ id: '', name: '', description: '' });
    setItemToDelete(null);
    setModalType(null);
  };


  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <motion.header  // Added motion.header
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
        <div className="flex flex-col mb-2 space-y-2"> {/* Added flex-col and space-y-2 for better layout */}
          <Input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
          <Input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} />
        </div> {/* Closing div for flex-col */}

        <div className="ml-14">
          {editingItem ? (
            <Update onClick={updateItem} />
          ) : (
            <Button onClick={addItem}>Add</Button>
          )}
        </div>
      </div>

      <div className="mb-4">
        {isLoading && <Loading />}
      </div>

      <Search
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
      />

      <ul className="w-full">
        {filteredItems.map((item) => (
          <li key={item.id} className="border p-2 mb-2 flex justify-between w-full">
            <div>
              <span className="font-bold">{item.name}</span>: {item.description}
            </div>
            <div className="flex gap-2">
              <EditButton onClick={() => editItem(item)} />
              <DeleteButton onClick={() => confirmDelete(item)} />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <ConfirmationModal
          onClose={closeModal}
          onConfirm={modalType === 'delete' ? deleteItem : handleConfirmUpdate} // Call appropriate function
          title={modalType === 'delete' ? "Are you sure?" : "Edit Item"}
          message={modalType === 'delete' ? "Do you really want to delete this item?" : "Edit the item details."}
          confirmButtonText={modalType === 'delete' ? "Delete" : "Update"}
        />
      )}

      <ToastContainer />
    </div>
  );
}