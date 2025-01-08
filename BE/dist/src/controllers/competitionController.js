"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCompetitionsController = exports.checkCompetitionsController = exports.inputDataCompetitionsController = void 0;
const competitionsModel_1 = require("../models/competitionsModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerModel_1 = require("../models/registerModel");
const fileUpload_1 = require("../config/fileUpload");
const inputDataCompetitionsController = async (req, res) => {
    try {
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
        const status_cek = await (0, registerModel_1.checkStatusRegistrasiWithExpectedStatus)(RegistrationID, 2);
        if (status_cek !== 2) {
            return res
                .status(400)
                .json({ message: "Status registrasi sudah diverifikasi" });
        }
        const file = req.files;
        if (!file.Proposal ||
            !file.Dokumen_Substansi ||
            !file.Pernyataan_Originalitas) {
            return res.status(400).json({ message: "Files are missing" });
        }
        const proposalUrl = await (0, fileUpload_1.uploadFile)(file.Proposal[0].buffer, "Proposal");
        const dokumenSubstansiUrl = await (0, fileUpload_1.uploadFile)(file.Dokumen_Substansi[0].buffer, "Dokumen_Substansi");
        const pernyataanOriginalitasUrl = await (0, fileUpload_1.uploadFile)(file.Pernyataan_Originalitas[0].buffer, "Pernyataan_Originalitas");
        const newDataCompetitions = {
            RegistrationID,
            Proposal: proposalUrl,
            Dokumen_Substansi: dokumenSubstansiUrl,
            Pernyataan_Origalitas: pernyataanOriginalitasUrl,
            CompetitionsID: 0,
            title: "",
        };
        const result = await (0, competitionsModel_1.inputDataCompetitions)(RegistrationID, newDataCompetitions);
        if (result !== 200) {
            console.log("errro nih");
            return res.status(400).json({
                message: "Error inputting competition data",
            });
        }
        (0, registerModel_1.changeStatusRegistrasi)(RegistrationID, 3);
        res.status(200).json({
            message: "Data kompetisi berhasil diinput",
            data: newDataCompetitions,
        });
    }
    catch (error) {
        console.error("Error in inputDataCompetitionsController:", error);
        res.status(500).json({ message: "Error inputting competition data" });
    }
};
exports.inputDataCompetitionsController = inputDataCompetitionsController;
const checkCompetitionsController = async (req, res) => {
    try {
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
        const status_cek = await (0, competitionsModel_1.checkCompetitionsByRegistrationID)(RegistrationID);
        if (status_cek !== 1) {
            return res.status(400).json({
                message: "user belum mengUpload Document",
            });
        }
        res.status(200).json({
            message: "Status registrasi sudah diverifikasi ,,,",
        });
    }
    catch (error) {
        console.error("Error in checkCompetitionsController:", error);
        res.status(500).json({ message: "Error checking competition data" });
    }
};
exports.checkCompetitionsController = checkCompetitionsController;
const getAllCompetitionsController = async (req, res) => {
    try {
        const Competitions = await (0, competitionsModel_1.getAllCompetitions)();
        res.json(Competitions);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian competition controller");
        res.status(500).json({
            message: "backend error broo bagian competition controller",
        });
    }
};
exports.getAllCompetitionsController = getAllCompetitionsController;
