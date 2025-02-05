import io from "socket.io-client";

const url = "http://vleep-deep.ru:3000";

export const socket = io(url, {
  transports: ["websocket"],
});
