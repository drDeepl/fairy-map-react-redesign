import io, { Socket } from "socket.io-client";
import { tokenService } from "../../services/token.service";

const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_IO_API_URL as string;

let socketInstance: typeof Socket | null = null;

export function initSocket(): typeof Socket {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: {
        token: tokenService.getAccessToken() || "",
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    socketInstance?.on("connect", () => {
      console.info("WebSocket connected:", socketInstance?.id);
    });
    socketInstance?.on("connect_error", (err: any) => {
      console.error("WebSocket connect error:", err);
    });
    socketInstance?.on("disconnect", (reason: any) => {
      console.warn("WebSocket disconnected:", reason);
    });
  }
  return socketInstance;
}
