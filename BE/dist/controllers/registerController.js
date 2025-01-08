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
exports.deleteRegisterController = exports.updateRegisterController = exports.getAllRegisterController = exports.getSingleRegisterController = exports.createRegisterController = exports.logoutRegisterController = exports.loginRegisterController = void 0;
const registerModel_1 = require("../models/registerModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateID_1 = require("../utils/generateID");
const emailController_1 = require("./emailController");
//login controller
const loginRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const data = yield (0, registerModel_1.login)(email, password);
        if (data) {
            res.status(200).json({
                message: "Login successful",
                data: data.token,
            });
        }
        else {
            res.status(401).json({
                message: "Email or password is incorrect",
            });
        }
    }
    catch (error) {
        console.error(error, "\nBackend error during login process.");
        res.status(500).json({
            message: "Internal server error during login process",
        });
    }
});
exports.loginRegisterController = loginRegisterController;
// Logout controller
const logoutRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Logout (set token di database menjadi null)
        yield (0, registerModel_1.logout)(RegistrationID);
        res.status(200).json({ message: "Logout berhasil" });
    }
    catch (error) {
        // Jika terjadi error saat verifikasi token atau proses lainnya
        console.error(error, "\n   backend error broo bagian register controller logout ");
        res.status(500).json({
            message: "backend error broo bagian register controller logout",
        });
    }
});
exports.logoutRegisterController = logoutRegisterController;
const createRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, } = req.body;
        const RegistrationID = (0, generateID_1.generateID)();
        const newRegister = {
            RegistrationID,
            Nama,
            Nomor_Telfon,
            Nama_Instansi,
            Nama_Team,
            Nomor_Induk_Mahasiswa,
            Email,
            Provinsi,
            Kabupaten,
            Password,
            Pilihan_Lomba,
        };
        const emailCheckResult = (_a = (yield (0, registerModel_1.checkEmail)(Email))) !== null && _a !== void 0 ? _a : 200;
        if (emailCheckResult === 401) {
            return res.status(401).json({
                code: 401,
                message: "Email already registered",
            });
        }
        const checkNamaTeamResult = (_b = (yield (0, registerModel_1.checkNamaTeam)(Nama_Team))) !== null && _b !== void 0 ? _b : 200;
        if (checkNamaTeamResult === 401) {
            return res.status(401).json({
                code: 401,
                message: "Team name already registered",
            });
        }
        const checkNomorTelfonResult = (_c = (yield (0, registerModel_1.checkNomorTelfon)(Nomor_Telfon))) !== null && _c !== void 0 ? _c : 200;
        if (checkNomorTelfonResult === 401) {
            return res.status(401).json({
                code: 401,
                message: "Phone number already registered",
            });
        }
        const checkNomorIndukMahasiswa = (_d = (yield (0, registerModel_1.checkNIM)(Nomor_Induk_Mahasiswa))) !== null && _d !== void 0 ? _d : 200;
        if (checkNomorIndukMahasiswa === 401) {
            return res.status(401).json({
                code: 401,
                message: "NIM already registered",
            });
        }
        const result = yield (0, registerModel_1.createRegister)(newRegister);
        if (result === 201) {
            const subject = "Selamat! Anda Telah Teregisterasi Tahap 1";
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Halo ${Nama},</h2>
          <p>Selamat! Anda telah berhasil menyelesaikan tahap pertama registrasi Lomba Evolution.</p>
          <p>Semoga sukses dalam perjalanan Anda mengikuti lomba ini. Terima kasih telah berpartisipasi!</p>
          <p style="font-style: italic; margin-top: 20px;">Salam Hangat,<br>Panitia Evolution Competition</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://evolutiontelkomuniversity.com" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Kunjungi Website Kami</a>
          </div>
        </div>
      `;
            // Try to send the email and handle any errors
            try {
                yield emailController_1.sendMessage.sendEmail(Email, subject, "", htmlContent);
                res.status(201).json({
                    code: 201,
                    message: "Register created successfully",
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: "Register created, but failed to send email",
                });
            }
        }
        else {
            res.status(400).json({
                code: 400,
                message: "Register failed to create",
            });
        }
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({
            code: 500,
            message: "backend error broo bagian register controller",
        });
    }
});
exports.createRegisterController = createRegisterController;
const getSingleRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const singleRegister = yield (0, registerModel_1.getSingleRegister)(Number(RegistrationID));
        if (singleRegister) {
            res.json(singleRegister);
        }
        else {
            res.status(404).json({ message: "Register not found" });
        }
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({
            message: "backend error broo bagian register controller",
        });
    }
});
exports.getSingleRegisterController = getSingleRegisterController;
const getAllRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRegister = yield (0, registerModel_1.getAllRegisters)();
        res.json(dataRegister);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({
            message: "backend error broo bagian register controller",
        });
    }
});
exports.getAllRegisterController = getAllRegisterController;
const updateRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedRegister = req.body;
        yield (0, registerModel_1.updateRegister)(Number(id), updatedRegister);
        res.json({ message: "Register updated successfully" });
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({
            message: "backend error broo bagian register controller",
        });
    }
});
exports.updateRegisterController = updateRegisterController;
const deleteRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, registerModel_1.deleteRegister)(Number(id));
        res.json({ message: "Register deleted successfully" });
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({
            message: "backend error broo bagian register controller",
        });
    }
});
exports.deleteRegisterController = deleteRegisterController;
