import React from 'react';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">CRUD Example</h1>
                <nav>
                    <a href="#home" className="px-4 hover:underline">Home</a>
                    <a href="#about" className="px-4 hover:underline">About</a>
                    <a href="#contact" className="px-4 hover:underline">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
