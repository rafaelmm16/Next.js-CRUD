import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        × {/* Close button */}
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};


export default Modal;