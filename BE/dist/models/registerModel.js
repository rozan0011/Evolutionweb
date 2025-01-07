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
exports.deleteRegister = exports.updateRegister = exports.getSingleRegister = exports.getAllRegisters = exports.checkStatusRegistrasi = exports.logout = exports.login = exports.createRegister = exports.changeStatusRegistrasi = exports.checkStatusRegistrasiWithExpectedStatus = exports.checkNama = exports.checkNomorTelfon = exports.checkNIM = exports.checkNamaTeam = exports.checkEmail = void 0;
var db_1 = require("../config/db");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateID_1 = require("../utils/generateID");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// fungsi buat mengecek apakah email sudah terdaftar atau belum mengembalikan number
var checkEmail = function (Email) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Email = ?", [Email])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, 401];
                }
                else {
                    return [2 /*return*/, 200];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkEmail = checkEmail;
// fungsi buat cek apakah Nama_Team sudah terdaftar atau belum
var checkNamaTeam = function (Nama_Team) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Nama_Team = ?", [Nama_Team])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, 401];
                }
                else {
                    return [2 /*return*/, 200];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNamaTeam = checkNamaTeam;
// fungsi buat cek nomor induk mahasiswa sudah terdaftar atau belum
var checkNIM = function (Nomor_Induk_Mahasiswa) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Nomor_Induk_Mahasiswa = ?", [Nomor_Induk_Mahasiswa])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, 401];
                }
                else {
                    return [2 /*return*/, 200];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNIM = checkNIM;
// fungsi buat cek nomor telfon sudah terdaftar atau belum
var checkNomorTelfon = function (Nomor_Telfon) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Nomor_Telfon = ?", [Nomor_Telfon])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, 401];
                }
                else {
                    return [2 /*return*/, 200];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNomorTelfon = checkNomorTelfon;
// fungsi buat cek nama sudah terdaftar atau belum
var checkNama = function (Nama) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Nama = ?", [Nama])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, 401];
                }
                else {
                    return [2 /*return*/, 200];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNama = checkNama;
// fungsi untuk cek Status_Registrasi
var checkStatusRegistrasiWithExpectedStatus = function (RegistrationID, expect_status) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    if (dataRegister[0].Status_Registrasi === expect_status) {
                        return [2 /*return*/, expect_status];
                    }
                    else {
                        return [2 /*return*/, 500];
                    }
                }
                else {
                    return [2 /*return*/, 500];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkStatusRegistrasiWithExpectedStatus = checkStatusRegistrasiWithExpectedStatus;
// fungsi untuk merubah status
var changeStatusRegistrasi = function (RegistrationID, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("UPDATE Register SET Status_Registrasi = ? WHERE RegistrationID = ?", [newStatus, RegistrationID])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.changeStatusRegistrasi = changeStatusRegistrasi;
// fungsi untuk input data registrasi
var createRegister = function (newRegister) { return __awaiter(void 0, void 0, void 0, function () {
    var RegistrationID, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Competitions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                RegistrationID = newRegister.RegistrationID, Nama = newRegister.Nama, Nomor_Telfon = newRegister.Nomor_Telfon, Nama_Instansi = newRegister.Nama_Instansi, Nama_Team = newRegister.Nama_Team, Nomor_Induk_Mahasiswa = newRegister.Nomor_Induk_Mahasiswa, Email = newRegister.Email, Provinsi = newRegister.Provinsi, Kabupaten = newRegister.Kabupaten, Password = newRegister.Password, Pilihan_Lomba = newRegister.Pilihan_Lomba;
                return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Register \n            (RegistrationID,Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token) \n            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
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
                        0,
                        "",
                    ])];
            case 1:
                _a.sent();
                // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
                return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Team (TeamID,RegistrationID,Nama_Anggota1,NIM_Anggota1) VALUES (?,?,?,?)", [
                        (0, generateID_1.generateID)(),
                        newRegister.RegistrationID,
                        Nama,
                        Nomor_Induk_Mahasiswa,
                    ])];
            case 2:
                // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
                _a.sent();
                Competitions = "";
                switch (Pilihan_Lomba) {
                    case "bisnis plan":
                        Competitions = "bisnis plan";
                        break;
                    case "uiux":
                        Competitions = "uiux";
                        break;
                    case "web design":
                        Competitions = "web design";
                        break;
                    case "poster infografis":
                        Competitions = "poster infografis";
                        break;
                    default:
                        Competitions = "";
                }
                if (!Competitions) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Competitions (CompetitionsID, RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title) VALUES (?, ?, ?,?, ?, ?)", [
                        (0, generateID_1.generateID)(),
                        newRegister.RegistrationID,
                        "",
                        "",
                        "",
                        Competitions,
                    ])];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: 
            // ngbuat table Administrative dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
            return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Administrative \n            (AdministrativeID ,RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)\n            VALUES (?, ?, ?, ?, ?)", [(0, generateID_1.generateID)(), newRegister.RegistrationID, "", "", ""])];
            case 5:
                // ngbuat table Administrative dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
                _a.sent();
                return [2 /*return*/, 201];
        }
    });
}); };
exports.createRegister = createRegister;
// login
var login = function (Email, Password) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE Email = ? AND Password = ?", [Email, Password])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (!(dataRegister.length > 0)) return [3 /*break*/, 3];
                token = jsonwebtoken_1.default.sign({ RegistrationID: dataRegister[0].RegistrationID }, process.env.SECRET_KEY, { expiresIn: "3h" });
                // ngisi token di table Register
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [token, dataRegister[0].RegistrationID])];
            case 2:
                // ngisi token di table Register
                _a.sent();
                // Tambahkan token ke objek yang akan dikembalikan
                dataRegister[0].token = token;
                return [2 /*return*/, dataRegister[0]];
            case 3: return [2 /*return*/, null]; // Email atau password salah
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error("Error during login:", error_1);
                throw new Error("Error during login process");
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// logout
var logout = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [null, RegistrationID])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
// fungsi untuk cek status registrasi yang mertun string status_registrasi ("sudah" atau "belum")
var checkStatusRegistrasi = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    if (dataRegister[0].Status_Registrasi === 1) {
                        return [2 /*return*/, "sudah"];
                    }
                    else {
                        return [2 /*return*/, "belum"];
                    }
                }
                else {
                    return [2 /*return*/, "data tidak ditemukan"];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkStatusRegistrasi = checkStatusRegistrasi;
// admin
var getAllRegisters = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register")];
            case 1:
                dataRegister = (_a.sent())[0];
                return [2 /*return*/, dataRegister];
        }
    });
}); };
exports.getAllRegisters = getAllRegisters;
var getSingleRegister = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRegister;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataRegister = (_a.sent())[0];
                if (dataRegister.length > 0) {
                    return [2 /*return*/, dataRegister[0]];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleRegister = getSingleRegister;
var updateRegister = function (RegistrationID, updatedRegister) { return __awaiter(void 0, void 0, void 0, function () {
    var Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Nama = updatedRegister.Nama, Nomor_Telfon = updatedRegister.Nomor_Telfon, Nama_Instansi = updatedRegister.Nama_Instansi, Nama_Team = updatedRegister.Nama_Team, Nomor_Induk_Mahasiswa = updatedRegister.Nomor_Induk_Mahasiswa, Email = updatedRegister.Email, Provinsi = updatedRegister.Provinsi, Kabupaten = updatedRegister.Kabupaten, Password = updatedRegister.Password, Pilihan_Lomba = updatedRegister.Pilihan_Lomba, Status_Registrasi = updatedRegister.Status_Registrasi;
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Register SET \n    Nama = COALESCE(?, Nama),\n    Nomor_Telfon = COALESCE(?, Nomor_Telfon),\n    Nama_Instansi = COALESCE(?, Nama_Instansi),\n    Nama_Team = COALESCE(?, Nama_Team),\n    Nomor_Induk_Mahasiswa = COALESCE(?, Nomor_Induk_Mahasiswa),\n    Email = COALESCE(?, Email),\n    Provinsi = COALESCE(?, Provinsi),\n    Kabupaten = COALESCE(?, Kabupaten),\n    Password = COALESCE(?, Password),\n    Pilihan_Lomba = COALESCE(?, Pilihan_Lomba),\n    Status_Registrasi = COALESCE(?, Status_Registrasi)\n    WHERE RegistrationID = ?", [
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
                        Status_Registrasi,
                        RegistrationID,
                    ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateRegister = updateRegister;
var deleteRegister = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("DELETE FROM Register WHERE RegistrationID = ?", [
                    RegistrationID,
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteRegister = deleteRegister;
