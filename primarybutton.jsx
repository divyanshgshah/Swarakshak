import React from 'react';

const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 ${className}`}
  >
    {children}
  </button>
);

export default PrimaryButton;
