import React from 'react';
import { AlertTriangle, Map, MapPin, HeartHandshake, Home } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton.jsx'; // FIX: Added .jsx extension

const EvacuationMapScreen = ({ setModal }) => {
  const EvacAlert = ({ level, message }) => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl mb-4 flex items-start">
      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
      <div className="flex-grow">
        <h3 className="font-bold text-yellow-800 text-lg mb-1">Evacuation Alert Level {level}</h3>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
      <button className="ml-4 text-blue-600 text-sm font-medium hover:text-blue-700">More Info</button>
    </div>
  );

  const CriticalLocationCard = ({ title, distance, capacity, type }) => {
    const isEmergency = type === 'Emergency Services';
    const capacityColor = capacity.includes('High') ? 'bg-green-500' : 'bg-red-500';
    const icon = isEmergency ? HeartHandshake : Home;

    return (
      <div className="bg-white p-4 rounded-xl shadow-md flex-shrink-0 w-72 border border-gray-200">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-blue-600">{React.createElement(icon, { className: 'w-5 h-5' })}</span>
          <h3 className="font-bold text-gray-900 line-clamp-1">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{distance}</p>
        <div className="flex items-center space-x-2 mb-3">
          <span className={`text-xs text-white font-semibold px-2 py-0.5 rounded-full ${capacityColor}`}>
            {isEmergency ? 'Open' : `Open, Capacity: ${capacity}`}
          </span>
          {isEmergency && <span className="text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full">{type}</span>}
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100">Details</button>
          <PrimaryButton onClick={() => setModal({ isOpen: true, title: 'Navigation Started', message: `Starting navigation to ${title}...`, buttons: [{ text: 'OK', action: () => setModal({ isOpen: false }) }] })} className="!w-auto !py-2 !text-sm">
            Navigate
          </PrimaryButton>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 pt-0 mb-40">
      <EvacAlert
        level={2}
        message="Due to rising floodwaters, immediate evacuation of Sector Gamma is advised. Follow safe routes highlighted in green."
      />

      {/* Mock Map View */}
      <div className="w-full h-80 bg-gray-200 rounded-xl shadow-lg overflow-hidden relative mb-6">
          <img 
              src="https://placehold.co/400x320/E8F5E9/1E88E5?text=Evacuation+Map" 
              alt="Mock map showing safe zones"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x320/E8F5E9/1E88E5?text=Evacuation+Map" }}
          />
        <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Map className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Critical Locations</h2>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
        <CriticalLocationCard
          title="Community Center Alpha"
          distance="1.5 miles (2.4 km)"
          capacity="High"
          type="Shelter"
        />
        <CriticalLocationCard
          title="City General Hospital"
          distance="0.8 miles (1.3 km)"
          capacity="N/A"
          type="Emergency Services"
        />
        <CriticalLocationCard
          title="School Gym Beta"
          distance="3.0 miles (4.8 km)"
          capacity="Low"
          type="Shelter"
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto bg-white border-t z-10">
        <PrimaryButton
          onClick={() => setModal({ isOpen: true, title: 'Navigation Started', message: 'Starting GPS navigation along the safest route.', buttons: [{ text: 'OK', action: () => setModal({ isOpen: false }) }] })}
          className="shadow-2xl flex items-center justify-center text-lg"
        >
          <MapPin className="w-6 h-6 mr-2" /> Start Navigation
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EvacuationMapScreen;
