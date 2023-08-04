"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateEmbeded = (field, data, nameString) => {
    Object.keys(field).forEach(key => {
        const filedInner = `${nameString}.${key}`;
        data[filedInner] = field[key];
    });
    return data;
};
exports.default = updateEmbeded;
