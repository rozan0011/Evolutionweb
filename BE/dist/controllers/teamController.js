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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTeamsController = exports.getTeamNameByIDController = exports.getTeamByIDController = exports.addMemberTeamController = void 0;
const teamModel_1 = require("../models/teamModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerModel_1 = require("../models/registerModel");
const addMemberTeamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const cek_status = yield (0, registerModel_1.checkStatusRegistrasiWithExpectedStatus)(RegistrationID, 0);
        if (cek_status !== 0) {
            return res.status(400).json({ message: "bad request" });
        }
        const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = req.body;
        if (!Nama_Anggota2 ||
            !NIM_Anggota2 ||
            !Nama_Anggota3 ||
            !NIM_Anggota3) {
            return res
                .status(400)
                .json({ message: "All member details are required" });
        }
        const updatedTeam = yield (0, teamModel_1.addMemberTeam)(RegistrationID, {
            Nama_Anggota2,
            NIM_Anggota2,
            Nama_Anggota3,
            NIM_Anggota3,
        });
        if (updatedTeam) {
            res.status(200).json({
                message: "Team members updated successfully",
                team: updatedTeam,
            });
            yield (0, registerModel_1.changeStatusRegistrasi)(RegistrationID, 1);
        }
        else {
            res.status(404).json({
                message: "Team not found for the provided RegistrationID",
            });
        }
    }
    catch (error) {
        console.error(error, "\n   backend error during addMemberTeamController");
        res.status(500).json({
            message: "Internal server error during addMemberTeamController",
        });
    }
});
exports.addMemberTeamController = addMemberTeamController;
const getTeamByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const team = yield (0, teamModel_1.getTeamByID)(RegistrationID);
        if (team) {
            res.json(team);
        }
        else {
            res.status(404).json({ message: "Team not found" });
        }
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({
            message: "backend error broo bagian team controller",
        });
    }
});
exports.getTeamByIDController = getTeamByIDController;
const getTeamNameByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const team = yield (0, teamModel_1.getTeamNameByID)(RegistrationID);
        if (team) {
            res.json(team);
        }
        else {
            res.status(404).json({ message: "Team not found" });
        }
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({
            message: "backend error broo bagian team controller",
        });
    }
});
exports.getTeamNameByIDController = getTeamNameByIDController;
const getAllTeamsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield (0, teamModel_1.getAllTeams)();
        res.json(teams);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({
            message: "backend error broo bagian team controller",
        });
    }
});
exports.getAllTeamsController = getAllTeamsController;
