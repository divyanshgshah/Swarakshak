import React, { useState, useEffect } from 'react';
import { LifeBuoy, HeartHandshake, Utensils, AlertTriangle, MapPin } from 'lucide-react';
// FIX: Added .js extension
import { PAGES } from '../constants.js';

const SosScreen = ({ setModal }) => {
  const [gpsLocation, setGpsLocation] = useState('Fetching...');

  useEffect(() => {
    // Mocking GPS fetching
    const timer = setTimeout(() => {
      setGpsLocation('34.0522° N, 118.2437° W (Los Angeles)');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSosRequest = (type) => {
    setModal({
      isOpen: true,
      title: 'Emergency SOS Sent',
      message: `Your request for ${type} has been sent! Emergency services are being dispatched to your location. Stay calm.`,
      buttons: [{ text: 'OK', action: () => setModal({ isOpen: false }) }]
    });
  };

  const SosActionCard = ({ icon: Icon, title, description, color, onClick }) => (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-150 flex flex-col items-start h-36"
    >
      <Icon className={`w-8 h-8 mb-2 ${color}`} />
      <h3 className="font-bold text-gray-800 text-lg text-left">{title}</h3>
      <p className="text-sm text-gray-600 text-left mt-1">{description}</p>
    </button>
  );

  return (
    <div className="p-4 pt-0 mb-20 flex flex-col items-center">
      {/* Large SOS Button */}
      <div className="w-48 h-48 rounded-full bg-red-500 shadow-2xl flex flex-col items-center justify-center text-white mb-10 mt-6 animate-pulse">
        <AlertTriangle className="w-12 h-12" />
        <span className="text-4xl font-extrabold mt-1">SOS</span>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        <SosActionCard
          icon={LifeBuoy}
          title="Request Rescue"
          description="Dispatch emergency services to your location for rescue."
          color="text-blue-600"
          onClick={() => handleSosRequest('Rescue')}
        />
        <SosActionCard
          icon={HeartHandshake}
          title="Medical Help"
          description="Request immediate medical assistance from nearest responders."
          color="text-red-500"
          onClick={() => handleSosRequest('Medical Help')}
        />
        <SosActionCard
          icon={Utensils}
          title="Food & Water"
          description="Request essential supplies like food and potable water."
          color="text-green-600"
          onClick={() => handleSosRequest('Food & Water')}
        />
        {/* Placeholder to match the 2x2 grid layout style */}
        <div className="h-36"></div>
      </div>

      {/* Location Status */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <MapPin className="w-4 h-4 inline mr-1 text-gray-500" />
        GPS Location Attached: <span className="font-semibold text-gray-800">{gpsLocation}</span>
      </div>
    </div>
  );
};

export default SosScreen;
