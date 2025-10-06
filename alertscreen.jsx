import React from 'react';
import { Zap, AlertTriangle, CheckCircle, XCircle, Menu, Clock, MapPin } from 'lucide-react';
import { MOCK_ALERTS } from '../constants.js'; // FIX: Added .js extension

const AlertsScreen = () => {
  const AlertItem = ({ type, icon: Icon, title, time, location }) => {
    const colorMap = {
      Critical: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500', icon: 'text-red-500' },
      Warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500', icon: 'text-yellow-500' },
      Info: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500', icon: 'text-blue-500' },
    };
    const colors = colorMap[type] || colorMap.Info;

    return (
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 mb-4" style={{ borderColor: colors.border }}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <Icon className={`w-5 h-5 mr-3 ${colors.icon}`} />
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
              {type}
            </span>
          </div>
          <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
             Play Audio
          </button>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <Clock className="w-4 h-4 inline mr-1 text-gray-400" /> {time}
        </p>
        <p className="text-sm text-gray-600">
          <MapPin className="w-4 h-4 inline mr-1 text-gray-400" /> {location}
        </p>
      </div>
    );
  };

  return (
    <div className="p-4 mb-20">
      <div className="flex justify-end mb-4">
        <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium">
          <Menu className="w-4 h-4 mr-1" /> Filter
        </button>
      </div>
      {MOCK_ALERTS.map(alert => (
        <AlertItem key={alert.id} {...alert} />
      ))}
    </div>
  );
};

export default AlertsScreen;
