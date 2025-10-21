import express from 'express';
import sequelize from "./db.js";
import { ApolloServer} from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {resolvers} from "./resolvers/resolver.js";
import cors from "cors";
import http from "http";
import {typeDefs} from './schema.js';
import createContext from "./utils/context.js";
import {logger} from "./middlewares/loggingMiddleware.js";
import connectWithRetry from "./utils/connectWithRetry.js";

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

const server =  new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

let serverInstance;

const start = async () => {

    try {

        // Connecting to database
        await connectWithRetry();
        await sequelize.sync();

        await server.start();

        // Adding middlewares
        app.use(express.json());
        app.use(logger);
        app.use('/graphql',
            cors(),
            expressMiddleware(server,{
                    context: createContext,
                }
            ),
        )

        // Creating server instance
        serverInstance = httpServer.listen(
            PORT,
            "0.0.0.0",
            () => console.log(`Listening on port ${PORT}`)
        );

    } catch(e) {
        console.error(e);
    }
}

// Starting server
await start();

process.on('SIGINT', () => {
    console.log('SIGINT received. Closing HTTP server.');
    serverInstance.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
});