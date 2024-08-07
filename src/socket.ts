import { App } from "vue";
import { io, Socket } from "socket.io-client";

const socketPlugin = {
  install(app: App<Element>) {
    const socket = io(import.meta.env.VITE_BACKEND_DEV_URL);
    socket.on("connect", () => {
      socket.id
    });
    
    socket.on("disconnect", () => {
      
    });

    app.provide('socket', socket)
  }
}

export default socketPlugin;