'use client'; // Required for interactivity
import Image from 'next/image';

import { useState } from 'react';

const PreviewModalMobileApp = ({ onClose, companyName, logo }) => {
  const [activeScreen, setActiveScreen] = useState('home'); // State to manage active screen

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      {/* iPhone-like Device Frame */}
      <div className="iphone-frame bg-white rounded-lg overflow-hidden shadow-lg w-[375px] h-[667px] flex flex-col relative" style={{ borderRadius: '40px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' }}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          &times;
        </button>

        {/* App Header */}
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
          {logo && (
            <Image src={logo} alt="Company Logo" className="rounded-lg" />
          )}
        </div>

        {/* App Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeScreen === 'home' && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Welcome to {companyName}</h3>
              <p className="text-gray-600 mb-4">
                Discover the best features of our mobile app designed just for you.
              </p>

              {/* Featured Content Card */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold mb-2 text-gray-900">Featured Content</h4>
                <p className="text-gray-600">
                  Check out our latest updates and exclusive offers.
                </p>
              </div>

              {/* Personalized Recommendations Card */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-gray-900">Personalized Recommendations</h4>
                <p className="text-gray-600">
                  Get recommendations tailored to your preferences.
                </p>
              </div>
            </div>
          )}

          {activeScreen === 'features' && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">App Features</h3>

              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-green-500 text-2xl mr-2">✨</span>
                    <h4 className="font-bold text-gray-900">Cross-Platform Support</h4>
                  </div>
                  <p className="text-gray-600">
                    Works seamlessly on iOS and Android devices.
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-green-500 text-2xl mr-2">📱</span>
                    <h4 className="font-bold text-gray-900">User-Friendly Interface</h4>
                  </div>
                  <p className="text-gray-600">
                    Intuitive design for a smooth user experience.
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-green-500 text-2xl mr-2">🔒</span>
                    <h4 className="font-bold text-gray-900">Secure & Reliable</h4>
                  </div>
                  <p className="text-gray-600">
                    Your data is safe with our advanced security features.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreen === 'profile' && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Your Profile</h3>

              {/* Profile Card */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-4">
                  {logo && (
                    <Image
                      src={logo}
                      alt="Profile"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{companyName}</h4>
                    <p className="text-gray-600">Premium Member</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Manage your account settings and preferences.
                </p>
              </div>

              {/* Settings Card */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-gray-900">Settings</h4>
                <p className="text-gray-600">
                  Customize your app experience with our settings options.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* App Navigation */}
        <div className="flex justify-around p-4 bg-gray-100 border-t border-gray-200">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center text-sm ${activeScreen === 'home' ? 'text-green-500' : 'text-gray-600'
              }`}
          >
            <span className="text-2xl">🏠</span>
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveScreen('features')}
            className={`flex flex-col items-center text-sm ${activeScreen === 'features' ? 'text-green-500' : 'text-gray-600'
              }`}
          >
            <span className="text-2xl">✨</span>
            <span>Features</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center text-sm ${activeScreen === 'profile' ? 'text-green-500' : 'text-gray-600'
              }`}
          >
            <span className="text-2xl">👤</span>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModalMobileApp;