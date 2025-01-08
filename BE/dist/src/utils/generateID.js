"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = void 0;
const generateID = () => {
    return Math.floor(100 + Math.random() * 900);
};
exports.generateID = generateID;
