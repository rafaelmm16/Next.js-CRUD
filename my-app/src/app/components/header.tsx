import { motion } from 'framer-motion';
import React from 'react';

const Header = () => {
    return (
        <motion.header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">CRUD Example</h1>
                <nav>
                    <a href="#home" className="px-4 hover:underline">Home</a>
                    <a href="#about" className="px-4 hover:underline">About</a>
                    <a href="#contact" className="px-4 hover:underline">Contact</a>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
