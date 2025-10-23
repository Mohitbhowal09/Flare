import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <span className="font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-bold">Flare</h1>
        </div>
        <nav>
          <button 
            onClick={handleGetStarted}
            className="btn-primary"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center px-4 text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
          Professional Streaming <span className="text-indigo-400">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          Flare simplifies live streaming for beginners and podcasters with a clean, modern interface and integrated marketplace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleGetStarted}
            className="btn-primary text-lg px-8 py-3"
          >
            Start Streaming
          </button>
          <button className="btn-secondary text-lg px-8 py-3">
            View Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="text-indigo-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Stream Setup Wizard</h3>
              <p className="text-gray-400">
                Connect to Twitch, YouTube, or Kick in just 2 clicks with our intuitive setup wizard.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-indigo-400 text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Template Marketplace</h3>
              <p className="text-gray-400">
                Browse and import overlays, transitions, and alerts from our integrated marketplace.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-indigo-400 text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Performance Mode</h3>
              <p className="text-gray-400">
                Automatic GPU/CPU balancing ensures smooth streaming even on low-end PCs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© 2023 Flare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
