import http from "http";
import socketIo, { Server as SocketIOServer, Socket } from "socket.io";

let socketServer: SocketIOServer;

function init(httpServer: http.Server):void{
    
    // CORS for socket server:
    const option = { cors: {origin:"*"}};
    
    // Create socket server:
    socketServer = new socketIo.Server(httpServer, option);
     
    // Customer list management if we need to contact a specific person:.
    socketServer.sockets.on("connection", (socket: Socket) =>{
        console.log("New client connected on socket id: " + socket.id);
    });

}

// return socketServer
function getSocketServer(): SocketIOServer {
    return socketServer;
}

export default {
    init,
    getSocketServer
}