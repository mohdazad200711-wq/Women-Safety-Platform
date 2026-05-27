import React, { createContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketClient = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    setSocket(socketClient);

    socketClient.on('connect', () => setConnected(true));
    socketClient.on('disconnect', () => setConnected(false));

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ socket, connected }), [socket, connected]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
