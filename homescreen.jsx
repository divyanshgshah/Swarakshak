import React from 'react';
import { MapPin, HeartHandshake, Bell, XCircle, AlertTriangle } from 'lucide-react';
import { PAGES } from '../constants.js'; // FIX: Added .js extension

const HomeScreen = ({ setCurrentPage, setModal }) => {
  const handleRequestHelp = () => {
    setCurrentPage(PAGES.SOS);
  };

  const handleSafeRoutes = () => {
    setCurrentPage(PAGES.MAP);
  };

  const NewsCard = ({ title, date, summary }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 w-80 mr-4 border border-gray-100">
      <div className="h-32 bg-gray-200">
          <img 
              src="https://placehold.co/320x128/D3E0EA/3F51B5?text=News+Image" 
              alt="News illustration"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/320x128/D3E0EA/3F51B5?text=News+Image" }}
          />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 pt-0 mb-20">
      {/* Severe Weather Warning Card */}
      <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg mb-6 flex items-start">
        <AlertTriangle className="w-6 h-6 mr-3 mt-0.5" />
        <div className="flex-grow">
          <h2 className="font-bold text-lg mb-1">Severe weather warning:</h2>
          <p className="text-sm">Tornado watch issued for downtown area until 8 PM. Seek shelter immediately if sirens sound.</p>
        </div>
        <button className="ml-4 p-1 text-white opacity-80 hover:opacity-100">
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleSafeRoutes}
          className="bg-blue-600 text-white p-5 rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 flex flex-col items-start justify-between h-36"
        >
          <MapPin className="w-8 h-8 mb-2" />
          <div className="text-left">
            <h3 className="font-bold text-lg">Safe Routes</h3>
            <p className="text-xs opacity-90">View evacuation maps and safe zones during emergencies.</p>
          </div>
        </button>
        <button
          onClick={handleRequestHelp}
          className="bg-red-500 text-white p-5 rounded-xl shadow-lg hover:bg-red-600 transition duration-150 flex flex-col items-start justify-between h-36"
        >
          <HeartHandshake className="w-8 h-8 mb-2" />
          <div className="text-left">
            <h3 className="font-bold text-lg">Request Help</h3>
            <p className="text-xs opacity-90">Send an SOS alert to emergency services and contacts.</p>
          </div>
        </button>
      </div>

      {/* Community Updates */}
      <div className="bg-gray-100 p-4 rounded-xl text-center mb-8 shadow-inner">
        <div className="flex items-center justify-center mb-1">
          <Bell className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-bold text-gray-800 text-lg">Community Updates</h3>
        </div>
        <p className="text-sm text-gray-600">Access official government announcements and local news.</p>
      </div>

      {/* Latest News & Alerts */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Latest News & Alerts</h2>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide">
        <NewsCard
          title="City Council Meeting Highlights and Key Decisions"
          date="2024-07-28"
          summary="Summary of the recent city council meeting, including budget allocations and new initiatives."
        />
        <NewsCard
          title="Volunteer Cleanup Drive"
          date="2024-07-24"
          summary="Join us for the annual riverbank cleanup and community safety awareness event."
        />
        <NewsCard
          title="New Park Opening Ceremony"
          date="2024-07-20"
          summary="Details about the grand opening of the new Central City Community Park."
        />
      </div>
    </div>
  );
};

export default HomeScreen;
