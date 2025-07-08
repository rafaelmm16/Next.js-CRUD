import React from 'react';
import Button from './social';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <div className="flex justify-center">
                    <Button />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
