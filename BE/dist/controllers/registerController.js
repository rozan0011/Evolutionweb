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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegisterController = exports.updateRegisterController = exports.getAllRegisterController = exports.getSingleRegisterController = exports.createRegisterController = exports.logoutRegisterController = exports.loginRegisterController = void 0;
var registerModel_1 = require("../models/registerModel");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateID_1 = require("../utils/generateID");
var emailController_1 = require("./emailController");
//login controller
var loginRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Email and password are required" })];
                }
                return [4 /*yield*/, (0, registerModel_1.login)(email, password)];
            case 1:
                data = _b.sent();
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
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1, "\nBackend error during login process.");
                res.status(500).json({
                    message: "Internal server error during login process",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginRegisterController = loginRegisterController;
// Logout controller
var logoutRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, decoded, RegistrationID, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Token tidak ditemukan atau tidak valid",
                        })];
                }
                token = authHeader.split(" ")[1];
                decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                if (!decoded || !decoded.RegistrationID) {
                    return [2 /*return*/, res.status(400).json({ message: "Token tidak valid" })];
                }
                RegistrationID = decoded.RegistrationID;
                // Logout (set token di database menjadi null)
                return [4 /*yield*/, (0, registerModel_1.logout)(RegistrationID)];
            case 1:
                // Logout (set token di database menjadi null)
                _a.sent();
                res.status(200).json({ message: "Logout berhasil" });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                // Jika terjadi error saat verifikasi token atau proses lainnya
                console.error(error_2, "\n   backend error broo bagian register controller logout ");
                res.status(500).json({
                    message: "backend error broo bagian register controller logout",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logoutRegisterController = logoutRegisterController;
var createRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, RegistrationID, newRegister, emailCheckResult, checkNamaTeamResult, checkNomorTelfonResult, checkNomorIndukMahasiswa, result, subject, htmlContent, error_3, error_4;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 12, , 13]);
                _a = req.body, Nama = _a.Nama, Nomor_Telfon = _a.Nomor_Telfon, Nama_Instansi = _a.Nama_Instansi, Nama_Team = _a.Nama_Team, Nomor_Induk_Mahasiswa = _a.Nomor_Induk_Mahasiswa, Email = _a.Email, Provinsi = _a.Provinsi, Kabupaten = _a.Kabupaten, Password = _a.Password, Pilihan_Lomba = _a.Pilihan_Lomba;
                RegistrationID = (0, generateID_1.generateID)();
                newRegister = {
                    RegistrationID: RegistrationID,
                    Nama: Nama,
                    Nomor_Telfon: Nomor_Telfon,
                    Nama_Instansi: Nama_Instansi,
                    Nama_Team: Nama_Team,
                    Nomor_Induk_Mahasiswa: Nomor_Induk_Mahasiswa,
                    Email: Email,
                    Provinsi: Provinsi,
                    Kabupaten: Kabupaten,
                    Password: Password,
                    Pilihan_Lomba: Pilihan_Lomba,
                };
                return [4 /*yield*/, (0, registerModel_1.checkEmail)(Email)];
            case 1:
                emailCheckResult = (_b = (_f.sent())) !== null && _b !== void 0 ? _b : 200;
                if (emailCheckResult === 401) {
                    return [2 /*return*/, res.status(401).json({
                            code: 401,
                            message: "Email already registered",
                        })];
                }
                return [4 /*yield*/, (0, registerModel_1.checkNamaTeam)(Nama_Team)];
            case 2:
                checkNamaTeamResult = (_c = (_f.sent())) !== null && _c !== void 0 ? _c : 200;
                if (checkNamaTeamResult === 401) {
                    return [2 /*return*/, res.status(401).json({
                            code: 401,
                            message: "Team name already registered",
                        })];
                }
                return [4 /*yield*/, (0, registerModel_1.checkNomorTelfon)(Nomor_Telfon)];
            case 3:
                checkNomorTelfonResult = (_d = (_f.sent())) !== null && _d !== void 0 ? _d : 200;
                if (checkNomorTelfonResult === 401) {
                    return [2 /*return*/, res.status(401).json({
                            code: 401,
                            message: "Phone number already registered",
                        })];
                }
                return [4 /*yield*/, (0, registerModel_1.checkNIM)(Nomor_Induk_Mahasiswa)];
            case 4:
                checkNomorIndukMahasiswa = (_e = (_f.sent())) !== null && _e !== void 0 ? _e : 200;
                if (checkNomorIndukMahasiswa === 401) {
                    return [2 /*return*/, res.status(401).json({
                            code: 401,
                            message: "NIM already registered",
                        })];
                }
                return [4 /*yield*/, (0, registerModel_1.createRegister)(newRegister)];
            case 5:
                result = _f.sent();
                if (!(result === 201)) return [3 /*break*/, 10];
                subject = "Selamat! Anda Telah Teregisterasi Tahap 1";
                htmlContent = "\n        <div style=\"font-family: Arial, sans-serif; color: #333;\">\n          <h2 style=\"color: #4CAF50;\">Halo ".concat(Nama, ",</h2>\n          <p>Selamat! Anda telah berhasil menyelesaikan tahap pertama registrasi Lomba Evolution.</p>\n          <p>Semoga sukses dalam perjalanan Anda mengikuti lomba ini. Terima kasih telah berpartisipasi!</p>\n          <p style=\"font-style: italic; margin-top: 20px;\">Salam Hangat,<br>Panitia Evolution Competition</p>\n          <div style=\"text-align: center; margin-top: 20px;\">\n            <a href=\"https://evolutiontelkomuniversity.com\" style=\"display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;\">Kunjungi Website Kami</a>\n          </div>\n        </div>\n      ");
                _f.label = 6;
            case 6:
                _f.trys.push([6, 8, , 9]);
                return [4 /*yield*/, emailController_1.sendMessage.sendEmail(Email, subject, "", htmlContent)];
            case 7:
                _f.sent();
                res.status(201).json({
                    code: 201,
                    message: "Register created successfully",
                });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _f.sent();
                res.status(500).json({
                    code: 500,
                    message: "Register created, but failed to send email",
                });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({
                    code: 400,
                    message: "Register failed to create",
                });
                _f.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_4 = _f.sent();
                console.error(error_4, "\n   backend error broo bagian register controller");
                res.status(500).json({
                    code: 500,
                    message: "backend error broo bagian register controller",
                });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.createRegisterController = createRegisterController;
var getSingleRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, decoded, RegistrationID, singleRegister, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Token tidak ditemukan atau tidak valid",
                        })];
                }
                token = authHeader.split(" ")[1];
                decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                if (!decoded || !decoded.RegistrationID) {
                    return [2 /*return*/, res.status(400).json({ message: "Token tidak valid" })];
                }
                RegistrationID = decoded.RegistrationID;
                return [4 /*yield*/, (0, registerModel_1.getSingleRegister)(Number(RegistrationID))];
            case 1:
                singleRegister = _a.sent();
                if (singleRegister) {
                    res.json(singleRegister);
                }
                else {
                    res.status(404).json({ message: "Register not found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5, "\n   backend error broo bagian register controller");
                res.status(500).json({
                    message: "backend error broo bagian register controller",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleRegisterController = getSingleRegisterController;
var getAllRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, registerModel_1.getAllRegisters)()];
            case 1:
                dataRegister = _a.sent();
                res.json(dataRegister);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6, "\n   backend error broo bagian register controller");
                res.status(500).json({
                    message: "backend error broo bagian register controller",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllRegisterController = getAllRegisterController;
var updateRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedRegister, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                updatedRegister = req.body;
                return [4 /*yield*/, (0, registerModel_1.updateRegister)(Number(id), updatedRegister)];
            case 1:
                _a.sent();
                res.json({ message: "Register updated successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7, "\n   backend error broo bagian register controller");
                res.status(500).json({
                    message: "backend error broo bagian register controller",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateRegisterController = updateRegisterController;
var deleteRegisterController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, registerModel_1.deleteRegister)(Number(id))];
            case 1:
                _a.sent();
                res.json({ message: "Register deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error(error_8, "\n   backend error broo bagian register controller");
                res.status(500).json({
                    message: "backend error broo bagian register controller",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteRegisterController = deleteRegisterController;
