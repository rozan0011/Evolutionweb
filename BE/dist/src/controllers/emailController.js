"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const helpersEmail_1 = require("../utils/helpersEmail");
exports.sendMessage = {
    sendEmail: async (to, subject, text, html) => {
        try {
            await (0, helpersEmail_1.sendEmail)(to, subject, text, html);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    },
};
