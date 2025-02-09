import React, { useEffect, useRef } from 'react';

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirm",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    return () => {
      previousActiveElement?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-[90%] max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Conteúdo */}
        <div className="text-center">
          <h2 id="modal-title" className="text-xl font-bold py-4 text-gray-200">
            {title}
          </h2>
          <p id="modal-message" className="text-sm text-gray-500 px-2">
            {message}
          </p>
          <div className="mt-4 space-x-4">
            <button
              className="bg-gray-700 px-5 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-800 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 px-5 py-2 rounded-full text-sm text-white hover:bg-red-600 transition"
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
