"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFinalisController = void 0;
const finalisModel_1 = require("../models/finalisModel");
const getAllFinalisController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const finalis = yield (0, finalisModel_1.getAllFinalis)();
        res.json(finalis);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian finalis controller");
        res.status(500).json({ message: "backend error broo bagian finalis" });
    }
});
exports.getAllFinalisController = getAllFinalisController;
