import React from 'react';
import { Home, Bell, User, BookOpen } from 'lucide-react';

const Footer = ({ currentPage, setCurrentPage, newAlerts = 1 }) => {
  const navItems = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Alerts', icon: Bell, page: 'alerts', badge: newAlerts },
    { name: 'Learn', icon: BookOpen, page: 'learn' },
    { name: 'Profile', icon: User, page: 'profile' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center justify-center p-2 text-sm transition-colors relative ${
              currentPage === item.page ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <item.icon className="w-6 h-6 mb-0.5" />
            {item.badge > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
