import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = ({ title, showBackButton, onBack, showProfile = true }) => (
  <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-10">
    <div className="flex items-center">
      {showBackButton && (
        <button onClick={onBack} className="mr-3 p-2 text-gray-600 hover:text-blue-600 rounded-full">
          {/* Custom back arrow SVG to match mobile UI style */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      )}
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
    <div className="flex items-center space-x-4">
      <Bell className="w-6 h-6 text-gray-600" />
      {showProfile && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  </header>
);

export default Header;
