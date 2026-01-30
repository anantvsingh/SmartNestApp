import React, { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';

export const DeviceContext = createContext<any>(null);

export const DeviceProvider = ({ children }: any) => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    try {
      const res = await api.get('/devices');
      setDevices(res.data);
    } catch {
      setError('Failed to load devices');
    }
  };

  const updateDevice = async (id: string, state: any) => {
    try {
      await api.put(`/devices/${id}`, { state });
      fetchDevices();
    } catch {
      setError('Failed to update device');
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, updateDevice, error }}>
      {children}
    </DeviceContext.Provider>
  );
};
