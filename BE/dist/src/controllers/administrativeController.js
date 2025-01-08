"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAdministrativeController = exports.checkAdministrativeController = exports.uploadAdministrativeController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fileUpload_1 = require("../config/fileUpload");
const administrativeModel_1 = require("../models/administrativeModel");
const registerModel_1 = require("../models/registerModel");
const uploadAdministrativeController = async (req, res) => {
    try {
        // JWT Authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token tidak ditemukan atau tidak valid",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.RegistrationID) {
            return res.status(400).json({ message: "Token tidak valid" });
        }
        const RegistrationID = decoded.RegistrationID;
        // Check registration status
        const statusCheck = await (0, registerModel_1.checkStatusRegistrasiWithExpectedStatus)(RegistrationID, 1);
        if (statusCheck !== 1) {
            return res.status(400).json({ message: "Status registrasi tidak valid" });
        }
        // File validation
        const files = req.files;
        if (!files.Kartu_Tanda_Mahasiswa || !files.Bukti_post_Twibon || !files.Bukti_Pembayaran) {
            return res.status(400).json({ message: "File tidak lengkap" });
        }
        // Upload files to Cloudinary
        const kartuTandaMahasiswaUrl = await (0, fileUpload_1.uploadFile)(files.Kartu_Tanda_Mahasiswa[0].buffer, "Kartu_Tanda_Mahasiswa");
        const buktiPostTwibonUrl = await (0, fileUpload_1.uploadFile)(files.Bukti_post_Twibon[0].buffer, "Bukti_post_Twibon");
        const buktiPembayaranUrl = await (0, fileUpload_1.uploadFile)(files.Bukti_Pembayaran[0].buffer, "Bukti_Pembayaran");
        // Prepare data for database
        const newDataAdministrative = {
            AdministrativeID: 0,
            RegistrationID,
            Kartu_Tanda_Mahasiswa: kartuTandaMahasiswaUrl,
            Bukti_post_Twibon: buktiPostTwibonUrl,
            Bukti_Pembayaran: buktiPembayaranUrl,
        };
        // Save data to database
        await (0, administrativeModel_1.uploadDataAdministrative)(RegistrationID, newDataAdministrative);
        await (0, registerModel_1.changeStatusRegistrasi)(RegistrationID, 2);
        return res.status(200).json({
            message: "Documents uploaded successfully.",
            data: newDataAdministrative,
        });
    }
    catch (error) {
        console.error("Error in uploadAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while uploading documents.",
        });
    }
};
exports.uploadAdministrativeController = uploadAdministrativeController;
const checkAdministrativeController = async (req, res) => {
    try {
        // JWT Authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token tidak ditemukan atau tidak valid",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.RegistrationID) {
            return res.status(400).json({ message: "Token tidak valid" });
        }
        const RegistrationID = decoded.RegistrationID;
        const exists = await (0, administrativeModel_1.checkAdministrativeByRegistrationID)(RegistrationID);
        if (exists === 1) {
            return res.json({ message: "Data ditemukan", exists: true });
        }
        else {
            return res.json({ message: "Data tidak ditemukan", exists: false });
        }
    }
    catch (error) {
        console.error("Error in checkAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while checking administrative data.",
        });
    }
};
exports.checkAdministrativeController = checkAdministrativeController;
const getAllAdministrativeController = async (req, res) => {
    try {
        const administrativeData = await (0, administrativeModel_1.getAllAdministrative)();
        return res.json(administrativeData);
    }
    catch (error) {
        console.error("Error in getAllAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while retrieving administrative data.",
        });
    }
};
exports.getAllAdministrativeController = getAllAdministrativeController;
