import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>© 2025 CRUD Example. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#facebook" className="hover:text-blue-400">Facebook</a>
                    <a href="#twitter" className="hover:text-blue-400">Twitter</a>
                    <a href="#instagram" className="hover:text-pink-400">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
