"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFinalisController = void 0;
const finalisModel_1 = require("../models/finalisModel");
const getAllFinalisController = async (req, res) => {
    try {
        const finalis = await (0, finalisModel_1.getAllFinalis)();
        res.json(finalis);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian finalis controller");
        res.status(500).json({ message: "backend error broo bagian finalis" });
    }
};
exports.getAllFinalisController = getAllFinalisController;
