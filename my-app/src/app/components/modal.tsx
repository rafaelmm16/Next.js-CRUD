// components/modal.jsx
import React from 'react';

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, onConfirm, title, message, confirmButtonText = "Confirm" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-[250px]" onClick={(e) => e.stopPropagation()}> {/* Stop propagation */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold py-4 text-gray-200">{title}</h2>
          <p className="font-bold text-sm text-gray-500 px-2">{message}</p>
          <div className="p-2 mt-2 text-center space-x-1 md:block">
            <button className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300" onClick={onConfirm}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;