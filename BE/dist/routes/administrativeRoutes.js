"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var administrativeController_1 = require("../controllers/administrativeController");
var multer_1 = __importDefault(require("../config/multer"));
var router = (0, express_1.Router)();
router.post("/upload/document", multer_1.default.fields([
    { name: "Kartu_Tanda_Mahasiswa", maxCount: 1 },
    { name: "Bukti_post_Twibon", maxCount: 1 },
    { name: "Bukti_Pembayaran", maxCount: 1 },
]), administrativeController_1.uploadAdministrativeController); // http://localhost:3987/api/administrative/upload/document
router.get("/", administrativeController_1.getAllAdministrativeController);
router.get("/cek-administrasi", administrativeController_1.checkAdministrativeController); // http://localhost:3987/api/administrative/cek-administrasi
exports.default = router;
