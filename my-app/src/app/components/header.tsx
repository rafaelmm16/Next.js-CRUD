import { motion } from 'framer-motion';
import React from 'react';
import Button from './button';

const Header = () => {
    return (
        <motion.header className="bg-gradient-to-r from-indigo-500 via-purple-700 to-black text-white py-4 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">CRUD</h1>
                <nav>
                    <div className="flex justify-center ">
                        <Button />
                    </div>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
