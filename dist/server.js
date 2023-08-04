"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = __importDefault(require("process"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
const PORT = config_1.default.port;
let server;
const toggleServer = async () => {
    try {
        (0, dbConnect_1.default)();
        server = app_1.default.listen(PORT, () => {
            console.log(`Server is breathing on ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
process_1.default.on('SIGINT', async () => {
    handleServerShutdown('SIGINT');
});
process_1.default.on('SIGTERM', async () => {
    handleServerShutdown('SIGTERM');
});
process_1.default.on('unhandledRejection', async (error) => {
    console.log('unhandledRejection', error);
    handleServerShutdown('unhandledRejection', error);
});
process_1.default.on('uncaughtException', (error) => {
    console.log('Uncaught Exception:', error);
    handleServerShutdown('uncaughtException', error);
});
const handleServerShutdown = async (eventName, error) => {
    console.warn(`Server received ${eventName} signal. Server connection will be closed.`);
    if (eventName === 'SIGINT')
        await mongoose_1.default.disconnect();
    try {
        if (server) {
            server.close(() => {
                if (error) {
                    console.log(error);
                }
            });
        }
        process_1.default.exit(0);
    }
    catch (error) {
        console.log(error);
        process_1.default.exit(1);
    }
};
toggleServer();
