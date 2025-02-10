"use client";

import { useState } from 'react';
import Layout from './components/layout';
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
    setNewItem({ ...item });
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

    setModalType('edit');
    setShowModal(true);
  };

  const handleConfirmUpdate = () => {
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
      closeModal();
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
    <Layout>
    <div className="dynamic-gradient-background">
      <div className="container mx-auto p-8 flex flex-col items-center">

        <div className="mb-4 flex items-center">
          <div className="flex flex-col space-y-2">
            <Input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
            <Input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} />
          </div>
          <div className="ml-4">
            {editingItem ? (
              <Update onClick={updateItem} />
            ) : (
              <Button onClick={addItem}>Add</Button>
            )}
          </div>
        </div>

        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search items..." />

        <ul className="w-full">
          {filteredItems.map((item) => (
            <li key={item.id} className="border p-2 mb-2 flex justify-between">
              <span>{item.name}: {item.description}</span>
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
            onConfirm={modalType === 'delete' ? deleteItem : handleConfirmUpdate}
            title={modalType === 'delete' ? "Are you sure?" : "Edit Item"}
            message={modalType === 'delete' ? "Do you really want to delete this item?" : "Edit the item details."}
            confirmButtonText={modalType === 'delete' ? "Delete" : "Update"}
          />
        )}

        {isLoading && <Loading />}
        <ToastContainer />
      </div>
    </div>
    </Layout>
  );
}
