"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = __importDefault(require("process"));
const index_1 = __importDefault(require("./config/index"));
const URI = index_1.default.database_url;
const dbConnect = async () => {
    try {
        if (!URI) {
            console.log('No URI found in the configuration');
            process_1.default.exit(1);
        }
        await mongoose_1.default.connect(URI).then(() => {
            console.log('Database Connection Established');
        });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = dbConnect;
