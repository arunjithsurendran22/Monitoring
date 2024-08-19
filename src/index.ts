import app from "./app";
import routes from "./routes/routes";
import config from "./config/config";
import errorMiddleware from "./middlewares/web_server/error-middleware";
import serverConfig from "./server";
import connectToMongo from './db_connection/mongodb/connection';

// Initialize routes
routes(app);

// Database connection
connectToMongo();

// Use the error handling middleware
app.use(errorMiddleware);

// Start the server
serverConfig(app, config).startServer();
