import React, { useState } from 'react';
import { Zap, LogIn } from 'lucide-react';
import Header from '../components/Header.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-gray-50">
      <Header title="Log in or Sign Up" showBackButton={false} showProfile={false} />
      <div className="flex flex-col items-center text-center flex-grow justify-center">
        {/* SWARAKSHAK Logo */}
        <div className="text-blue-600 font-extrabold text-2xl flex items-center mb-1">
          <Zap className="w-6 h-6 mr-1" /> SWARAKSHAK
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SWARAKSHAK</h2>
        <p className="text-gray-600 mb-8 max-w-sm">Your secure portal for mission-critical operations.</p>

        {/* Phone Login Form */}
        <div className="w-full max-w-sm space-y-4">
          <label className="text-sm font-medium text-gray-700 block text-left">Country/Region</label>
          <div className="flex space-x-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 w-1/3"
            >
              <option value="+91">India (+91)</option>
              <option value="+1">USA (+1)</option>
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 w-2/3"
            />
          </div>
          <p className="text-xs text-gray-500 text-left mb-6">
            We'll call or text to confirm your number. Standard message and data rates apply.
          </p>
          <PrimaryButton onClick={() => onLogin('Phone')} className="mt-4">
            Continue
          </PrimaryButton>
        </div>

        {/* OR Separator */}
        <div className="w-full max-w-sm my-6 flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Options */}
        <div className="w-full max-w-sm space-y-3">
          {['Email', 'Apple', 'Google', 'Facebook'].map((method) => (
            <button
              key={method}
              onClick={() => onLogin(method)}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl text-gray-800 font-semibold hover:bg-gray-100 transition duration-150"
            >
              <LogIn className="w-5 h-5 mr-3 text-gray-500" />
              Continue with {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
