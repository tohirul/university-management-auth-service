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
const log_1 = __importDefault(require("./shared/log"));
const PORT = config_1.default.port;
let server;
const toggleServer = async () => {
    try {
        (0, dbConnect_1.default)();
        server = app_1.default.listen(PORT, () => {
            log_1.default.checkInfo.info(`Server is breathing on ${PORT}`);
        });
    }
    catch (error) {
        log_1.default.checkError.error(error);
    }
};
process_1.default.on('SIGINT', async () => {
    handleServerShutdown('SIGINT');
});
process_1.default.on('SIGTERM', async () => {
    handleServerShutdown('SIGTERM');
});
process_1.default.on('unhandledRejection', async (error) => {
    log_1.default.checkError.error('unhandledRejection', error);
    handleServerShutdown('unhandledRejection', error);
});
process_1.default.on('uncaughtException', (error) => {
    log_1.default.checkError.error('Uncaught Exception:', error);
    handleServerShutdown('uncaughtException', error);
});
const handleServerShutdown = async (eventName, error) => {
    log_1.default.checkInfo.warn(`Server received ${eventName} signal. Server connection will be closed.`);
    if (eventName === 'SIGINT')
        await mongoose_1.default.disconnect();
    try {
        if (server) {
            server.close(() => {
                if (error) {
                    log_1.default.checkError.error(error);
                }
            });
        }
        process_1.default.exit(0);
    }
    catch (error) {
        log_1.default.checkError.error(error);
        process_1.default.exit(1);
    }
};
toggleServer();
