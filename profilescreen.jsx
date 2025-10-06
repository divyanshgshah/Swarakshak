import React from 'react';
import { User, Mail, Phone, MapPin, Lock, LogOut, ChevronRight } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton.jsx';

const ProfileScreen = ({ navigate }) => {
  const profile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+91 98765 43210',
    location: '123 Main St, Central City',
    profilePic: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=JD',
  };

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Personal Information', action: () => console.log('Edit Profile') },
        { icon: Lock, label: 'Change Password', action: () => console.log('Change Password') },
        { icon: MapPin, label: 'Saved Locations', action: () => console.log('Saved Locations') },
      ],
    },
    {
      title: 'Support & Legal',
      items: [
        { icon: Mail, label: 'Contact Support', action: () => console.log('Contact Support') },
        { icon: BookOpen, label: 'Terms & Privacy', action: () => console.log('Terms & Privacy') },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-900 mt-4">{profile.name}</h2>
        <p className="text-sm text-gray-500">{profile.email}</p>
        <button className="mt-3 text-blue-600 font-medium text-sm">Edit Profile</button>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 space-y-3">
        <div className="flex items-center text-gray-700">
          <Phone className="w-5 h-5 mr-3 text-blue-500" />
          <span className="text-sm">{profile.phone}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin className="w-5 h-5 mr-3 text-blue-500" />
          <span className="text-sm">{profile.location}</span>
        </div>
      </div>

      {/* Settings Sections */}
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 pt-2">{section.title}</h3>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 divide-y divide-gray-100">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-base text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <div className="pt-4">
        <button
          onClick={() => navigate(PAGES.LOGIN)}
          className="w-full flex items-center justify-center py-3 px-4 bg-red-100 text-red-600 font-semibold rounded-xl shadow-sm hover:bg-red-200 transition"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
