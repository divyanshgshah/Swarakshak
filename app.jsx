import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import OnboardingScreen from './pages/OnboardingScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import HomeScreen from './pages/HomeScreen.jsx';
import AlertsScreen from './pages/AlertsScreen.jsx';
import SosScreen from './pages/SosScreen.jsx';
import EvacuationMapScreen from './pages/EvacuationMapScreen.jsx';
import LearnScreen from './pages/LearnScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import { PAGES, PAGE_TITLE_MAP } from './constants.js'; // Added .js extension

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.ONBOARDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', buttons: [] });

  // --- Auth & Navigation Logic ---
  
  const handleLogin = (method = 'Phone') => {
    // Mock login success
    setModalState({
      isOpen: true,
      title: 'Login Successful',
      message: `You have successfully logged in using ${method}. Welcome to SWARAKSHAK!`,
      buttons: [{ text: 'Continue', action: () => { setModalState({ isOpen: false }); setIsLoggedIn(true); setCurrentPage(PAGES.HOME); } }]
    });
  };

  const handleLogout = () => {
    // Mock logout
    setModalState({
      isOpen: true,
      title: 'Logged Out',
      message: 'You have successfully logged out.',
      buttons: [{ text: 'OK', action: () => { setModalState({ isOpen: false }); setIsLoggedIn(false); setCurrentPage(PAGES.LOGIN); } }]
    });
  };

  const handleOnboardingFinish = () => {
    setCurrentPage(PAGES.LOGIN);
  };
  
  // Handle back button behavior
  const handleBack = () => {
    if ([PAGES.SOS, PAGES.MAP, PAGES.LEARN, PAGES.ALERTS, PAGES.PROFILE].includes(currentPage)) {
      setCurrentPage(PAGES.HOME);
    }
  };

  const getCurrentScreen = useCallback(() => {
    switch (currentPage) {
      case PAGES.ONBOARDING:
        return <OnboardingScreen onFinish={handleOnboardingFinish} />;
      case PAGES.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case PAGES.HOME:
        return <HomeScreen setCurrentPage={setCurrentPage} setModal={setModalState} />;
      case PAGES.ALERTS:
        return <AlertsScreen />;
      case PAGES.SOS:
        return <SosScreen setModal={setModalState} />;
      case PAGES.MAP:
        return <EvacuationMapScreen setCurrentPage={setCurrentPage} setModal={setModalState} />;
      case PAGES.LEARN:
        return <LearnScreen />;
      case PAGES.PROFILE:
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <HomeScreen setCurrentPage={setCurrentPage} setModal={setModalState} />;
    }
  }, [currentPage]);

  // --- UI Display Logic ---
  const showHeader = currentPage !== PAGES.ONBOARDING && currentPage !== PAGES.LOGIN;
  const showFooter = showHeader && currentPage !== PAGES.SOS && currentPage !== PAGES.MAP;
  const showBackButton = [PAGES.SOS, PAGES.MAP, PAGES.LEARN, PAGES.ALERTS, PAGES.PROFILE].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Global Styles */}
      <style>
        {`
          body { margin: 0; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          #root, .AppContainer { display: flex; justify-content: center; }
        `}
      </style>

      <div className="AppContainer w-full max-w-lg min-h-screen shadow-2xl bg-white relative">
        {showHeader && (
          <Header
            title={PAGE_TITLE_MAP[currentPage]}
            showBackButton={showBackButton}
            onBack={handleBack}
            showProfile={currentPage !== PAGES.SOS && currentPage !== PAGES.MAP}
          />
        )}
        <main className="flex-grow overflow-y-auto">
          {getCurrentScreen()}
        </main>
        {showFooter && (
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} newAlerts={1} />
        )}
        <Modal {...modalState} onClose={() => setModalState({ isOpen: false })} />
      </div>
    </div>
  );
};

export default App;
