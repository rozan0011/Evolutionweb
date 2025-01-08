"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competitionController_1 = require("../controllers/competitionController");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.post("/upload", multer_1.default.fields([
    { name: "Proposal", maxCount: 1 },
    { name: "Dokumen_Substansi", maxCount: 1 },
    { name: "Pernyataan_Originalitas", maxCount: 1 },
]), competitionController_1.inputDataCompetitionsController); // http://localhost:3987/api/competitions/upload
router.get("/check", competitionController_1.checkCompetitionsController); // http://localhost:3987/api/competitions/check
router.get("/", competitionController_1.getAllCompetitionsController);
exports.default = router;
