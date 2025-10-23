import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

export const useStreamStatus = (platform, accessToken) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    if (!platform || !accessToken) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get(`/stream/status`, {
        params: { platform, accessToken }
      });
      setStatus(response.data.status);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stream status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Poll for status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [platform, accessToken]);

  return { status, loading, error, refetch: fetchStatus };
};
