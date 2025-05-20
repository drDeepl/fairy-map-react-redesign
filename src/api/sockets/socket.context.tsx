import React, { createContext, useContext, useEffect, useState } from "react";
import { initSocket } from "./socketClient";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<typeof Socket | null>(null);

interface SockerProvderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SockerProvderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const s = initSocket();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  if (!socket) {
    return <div>Подключение к WebSocket...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket должен вызываться внутри SocketProvider");
  }
  return ctx;
}
