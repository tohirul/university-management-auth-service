"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = __importDefault(require("process"));
const index_1 = __importDefault(require("./config/index"));
const log_1 = __importDefault(require("./shared/log"));
const URI = index_1.default.database_url;
const dbConnect = async () => {
    try {
        if (!URI) {
            log_1.default.checkError.error('No URI found in the configuration');
            process_1.default.exit(1);
        }
        await mongoose_1.default.connect(URI).then(() => {
            log_1.default.checkInfo.info('Database Connection Established');
        });
    }
    catch (error) {
        log_1.default.checkError.error(error.message);
    }
};
exports.default = dbConnect;
