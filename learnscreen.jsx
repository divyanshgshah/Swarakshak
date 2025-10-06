import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MOCK_TRAINING, MOCK_BADGES } from '../constants.js'; // FIX: Added .js extension

const LearnScreen = () => {
  const TrainingCard = ({ title, description, image, color }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-40 w-full hover:shadow-lg transition duration-150">
      <div className="flex h-full">
        <div className="p-3 flex flex-col justify-between w-2/3">
          <div>
            <h3 className="font-bold text-gray-900 text-base line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-600 mt-1 line-clamp-3">{description}</p>
          </div>
          <button className={`text-xs font-semibold ${color} hover:underline self-start mt-2`}>
            Start Lesson <ChevronRight className="w-3 h-3 inline ml-0.5" />
          </button>
        </div>
        <div className="w-1/3 bg-gray-100 flex items-center justify-center">
            <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src=image }}
            />
        </div>
      </div>
    </div>
  );

  const BadgeItem = ({ name, status, color, icon }) => (
    <div className="w-1/2 p-2">
      <div className="bg-white p-4 rounded-xl shadow-md text-center h-40 flex flex-col justify-between items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mb-2">{icon}</div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <span className={`text-xs text-white font-semibold px-3 py-1 rounded-full ${color} mt-2`}>
          {status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-4 pt-0 mb-20">
      <div className="bg-blue-50 p-6 rounded-xl mb-6 shadow-inner flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Hello, Citizen!</h2>
          <p className="text-sm text-gray-600 max-w-xs">
            Your readiness makes our community stronger. Keep learning!
          </p>
        </div>
      </div>

      {/* Training Modules */}
      {['Earthquake Preparedness', 'Flood Safety', 'Fire Prevention'].map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_TRAINING.filter(t => t.type === category).map((item, index) => (
              <TrainingCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                color="text-blue-600"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Quiz Card */}
      <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-center mb-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold text-white mb-2">Emergency Readiness Quiz</h3>
          <p className="text-sm text-blue-100 mb-4">
            Test your knowledge on natural disaster preparedness with a quick quiz!
          </p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-gray-100 transition duration-150">
            Start Quiz
          </button>
        </div>
      </div>

      {/* My Badges */}
      <h3 className="text-lg font-bold text-gray-800 mb-3">My Badges</h3>
      <div className="flex flex-wrap -m-2">
        {MOCK_BADGES.map((badge, index) => (
          <BadgeItem key={index} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default LearnScreen;
