import React from 'react';

const Modal = ({ title, message, isOpen, onClose, buttons = [{ text: 'OK', action: onClose }] }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`px-4 py-2 font-semibold rounded-xl transition duration-150 ${
                index === buttons.length - 1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
