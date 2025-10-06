import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton.jsx';

const OnboardingScreen = ({ onGetStarted }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Hindi', 'Marathi'];

  return (
    <div className="min-h-screen flex flex-col justify-between p-8 bg-gray-50">
      <div className="flex justify-end pt-4">
        <button className="text-gray-500 font-medium text-sm">Skip</button>
      </div>

      <div className="flex flex-col items-center text-center flex-grow justify-center">
        {/* SWARAKSHAK Logo */}
        <div className="text-blue-600 font-extrabold text-3xl flex items-center mb-1">
          <Zap className="w-8 h-8 mr-2" /> SWARAKSHAK
        </div>
        <p className="text-gray-700 text-sm mb-12">Your City, Your Safety, Our Priority</p>

        {/* Illustration */}
        <div className="mb-12 bg-gray-100 p-8 rounded-3xl">
          <img
            src="https://placehold.co/200x200/4F46E5/FFFFFF?text=Alerts"
            alt="Mobile alerts illustration"
            className="w-64 h-64 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Real-time Alerts</h1>
        <p className="text-gray-600 max-w-sm">
          Stay informed with immediate notifications on critical local events and public safety updates.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {/* Language Selection */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Language</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`py-2 px-6 rounded-xl text-sm font-semibold transition-colors ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Get Started Button */}
        <PrimaryButton onClick={onGetStarted} showArrow={true}>
          Get Started
        </PrimaryButton>
      </div>
    </div>
  );
};

export default OnboardingScreen;
