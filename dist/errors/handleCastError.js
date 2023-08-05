"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errors = [
        {
            path: err.path,
            message: err?.message || 'Invalid Input',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
