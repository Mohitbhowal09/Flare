import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-indigo-400 hover:text-indigo-300 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-medium">Settings</h2>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveSection('account')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeSection === 'account'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Account
                </button>
                <button
                  onClick={() => setActiveSection('streaming')}
                  className={`w-full text-left px-4 py-2 rounded-md mt-1 ${
                    activeSection === 'streaming'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Streaming
                </button>
                <button
                  onClick={() => setActiveSection('performance')}
                  className={`w-full text-left px-4 py-2 rounded-md mt-1 ${
                    activeSection === 'performance'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`w-full text-left px-4 py-2 rounded-md mt-1 ${
                    activeSection === 'security'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md mt-4 text-red-400 hover:bg-red-900 hover:text-red-200"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4">
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                {activeSection === 'account' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name || ''}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email || ''}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="form-input"
                        />
                      </div>
                      <button className="btn-primary">Save Changes</button>
                    </div>
                  </div>
                )}

                {activeSection === 'streaming' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Streaming Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="form-label">Default Resolution</label>
                        <select className="form-input">
                          <option>1920x1080 (1080p)</option>
                          <option>1280x720 (720p)</option>
                          <option>854x480 (480p)</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Framerate</label>
                        <select className="form-input">
                          <option>60 FPS</option>
                          <option>30 FPS</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Bitrate (kbps)</label>
                        <input
                          type="number"
                          defaultValue="6000"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Encoder</label>
                        <select className="form-input">
                          <option>x264</option>
                          <option>NVIDIA NVENC</option>
                          <option>AMD AMF</option>
                          <option>Intel QSV</option>
                        </select>
                      </div>
                      <button className="btn-primary">Save Changes</button>
                    </div>
                  </div>
                )}

                {activeSection === 'performance' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Performance Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Performance Mode</h3>
                          <p className="text-gray-400 text-sm">
                            Automatically optimize for low-end systems
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div>
                        <label className="form-label">CPU Priority</label>
                        <select className="form-input">
                          <option>High</option>
                          <option>Normal</option>
                          <option>Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Memory Usage Limit</label>
                        <input
                          type="number"
                          defaultValue="80"
                          className="form-input"
                          placeholder="Percentage"
                        />
                      </div>
                      <button className="btn-primary">Save Changes</button>
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="form-label">Two-Factor Authentication</label>
                        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                          <div>
                            <p>Protect your account with 2FA</p>
                            <p className="text-gray-400 text-sm">Not enabled</p>
                          </div>
                          <button className="btn-secondary">Enable</button>
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Active Sessions</label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                            <div>
                              <p>Windows PC - Current Session</p>
                              <p className="text-gray-400 text-sm">Last active: Just now</p>
                            </div>
                            <button className="text-red-400 hover:text-red-300">Revoke</button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                            <div>
                              <p>MacBook Pro</p>
                              <p className="text-gray-400 text-sm">Last active: 2 hours ago</p>
                            </div>
                            <button className="text-red-400 hover:text-red-300">Revoke</button>
                          </div>
                        </div>
                      </div>
                      <button className="btn-danger">Delete Account</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
