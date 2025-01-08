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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdministrative = exports.checkAdministrativeByRegistrationID = exports.getAllAdministrative = exports.uploadDataAdministrative = void 0;
var db_1 = require("../config/db");
// Function to upload administrative data
var uploadDataAdministrative = function (RegistrationID, newDataAdministrative) { return __awaiter(void 0, void 0, void 0, function () {
    var Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran, dataAdministrative, hasil;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Kartu_Tanda_Mahasiswa = newDataAdministrative.Kartu_Tanda_Mahasiswa, Bukti_post_Twibon = newDataAdministrative.Bukti_post_Twibon, Bukti_Pembayaran = newDataAdministrative.Bukti_Pembayaran;
                return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Administrative WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataAdministrative = (_a.sent())[0];
                if (!(dataAdministrative.length > 0)) return [3 /*break*/, 8];
                hasil = 200;
                if (!Kartu_Tanda_Mahasiswa) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Administrative SET Kartu_Tanda_Mahasiswa = ? WHERE RegistrationID = ?", [Kartu_Tanda_Mahasiswa, RegistrationID])];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!Bukti_post_Twibon) return [3 /*break*/, 5];
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Administrative SET Bukti_post_Twibon = ? WHERE RegistrationID = ?", [Bukti_post_Twibon, RegistrationID])];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!Bukti_Pembayaran) return [3 /*break*/, 7];
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Administrative SET Bukti_Pembayaran = ? WHERE RegistrationID = ?", [Bukti_Pembayaran, RegistrationID])];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, hasil]; // Return success status
            case 8:
                console.error("Data Administrative tidak ditemukan");
                return [2 /*return*/, 404]; // Not found
        }
    });
}); };
exports.uploadDataAdministrative = uploadDataAdministrative;
// Function to get all administrative data
var getAllAdministrative = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dataAdministrative;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Administrative")];
            case 1:
                dataAdministrative = (_a.sent())[0];
                return [2 /*return*/, dataAdministrative]; // Cast to Administrative[]
        }
    });
}); };
exports.getAllAdministrative = getAllAdministrative;
// Function to check if administrative data exists for a given RegistrationID
var checkAdministrativeByRegistrationID = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    var dataAdministrative;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Administrative WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataAdministrative = (_a.sent())[0];
                // Check if data exists and all fields are filled
                if (dataAdministrative.length > 0 &&
                    dataAdministrative[0].Kartu_Tanda_Mahasiswa &&
                    dataAdministrative[0].Bukti_post_Twibon &&
                    dataAdministrative[0].Bukti_Pembayaran) {
                    return [2 /*return*/, 1]; // All fields are filled
                }
                else {
                    return [2 /*return*/, 0]; // Not all fields are filled or no data found
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkAdministrativeByRegistrationID = checkAdministrativeByRegistrationID;
// Function to create administrative data for a given RegistrationID
var createAdministrative = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Administrative \n            (RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)\n            VALUES (?, '', '', '')", [RegistrationID])];
            case 1:
                result = (_a.sent())[0];
                if (result.affectedRows > 0) {
                    return [2 /*return*/, 1]; // Successfully inserted
                }
                else {
                    return [2 /*return*/, 0]; // Insertion failed
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error inserting data into Administrative:", error_1);
                return [2 /*return*/, 0]; // Insertion failed
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createAdministrative = createAdministrative;
