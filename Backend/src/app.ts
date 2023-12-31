import express from "express";
import expressFileUpload from "express-fileupload"
import cors from "cors";
import vacationsRoutes from "./6-routes/vacations-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes"
import socketIoService from "./5-service/socketIoService";
import ordersRoutes from "./6-routes/orders-routes";
import contactsRoutes from "./6-routes/contacts-routes";
import followersRoutes from "./6-routes/followers-routes";


// Create server
const server = express();

// Helps you access many functions in the browser.
server.use(cors());

// Create request.body object if json was sent:
server.use(express.json());

// Get files sent by the front into request.files object:
server.use(expressFileUpload());

// Route requests:
server.use("/api", vacationsRoutes);
server.use("/api", ordersRoutes);
server.use("/api", contactsRoutes);
server.use("/api", followersRoutes);
server.use("/api", authRoute);

// Handle route not found:
server.use(routeNotFound);

// Handle catch-all
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

// Create server for socket service:
const httpServer = server.listen(appConfig.socketPort, () => console.log("Socket server listening on http://localhost:" + appConfig.socketPort));

// Start socket service :
socketIoService.init(httpServer);
