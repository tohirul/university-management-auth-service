"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculatePagination = (options) => {
    const page = Number(options?.page || 1);
    const limit = Number(options?.limit || 10);
    return {
        page,
        limit,
        skip: (page - 1) * limit,
        sortBy: options?.sortBy || 'createdAt',
        sortOrder: options?.sortOrder || 'desc',
    };
};
const paginationHelpers = {
    calculatePagination,
};
exports.default = paginationHelpers;
