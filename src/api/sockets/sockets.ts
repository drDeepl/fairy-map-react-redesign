import io from "socket.io-client";

const url = `${import.meta.env.VITE_WEBSOCKET_IO_API_URL}`;

export const socket = io(url, {
  transports: ["websocket"],
});
