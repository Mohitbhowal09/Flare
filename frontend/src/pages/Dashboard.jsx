import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StreamSetupWizard from '../components/StreamSetupWizard';
import LiveControlsPanel from '../components/LiveControlsPanel';
import Marketplace from '../components/Marketplace';
import HelpSupportSection from '../components/HelpSupportSection';
import PerformanceMode from '../components/PerformanceMode';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('stream');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'stream':
        return <StreamSetupWizard />;
      case 'controls':
        return <LiveControlsPanel />;
      case 'marketplace':
        return <Marketplace />;
      case 'performance':
        return <PerformanceMode />;
      case 'help':
        return <HelpSupportSection />;
      default:
        return <StreamSetupWizard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">F</span>
                </div>
                <span className="ml-2 text-xl font-bold">Flare</span>
              </div>
              <nav className="ml-6 flex space-x-4">
                <button
                  onClick={() => setActiveTab('stream')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'stream'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Stream Setup
                </button>
                <button
                  onClick={() => setActiveTab('controls')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'controls'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Live Controls
                </button>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'marketplace'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Marketplace
                </button>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate('/settings')}
                className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
