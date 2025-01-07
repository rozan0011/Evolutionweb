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
exports.createCompetitions = exports.uploadDocument = exports.getAllCompetitions = exports.checkCompetitionsByRegistrationID = exports.inputDataCompetitions = void 0;
var db_1 = require("../config/db");
var inputDataCompetitions = function (RegistrationID, newDataCompetitions) { return __awaiter(void 0, void 0, void 0, function () {
    var Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title, connection, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Pernyataan_Origalitas = newDataCompetitions.Pernyataan_Origalitas, Proposal = newDataCompetitions.Proposal, Dokumen_Substansi = newDataCompetitions.Dokumen_Substansi, title = newDataCompetitions.title;
                return [4 /*yield*/, db_1.DBconnection.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 13, 15, 16]);
                return [4 /*yield*/, connection.beginTransaction()];
            case 3:
                _a.sent();
                if (!(Pernyataan_Origalitas !== "")) return [3 /*break*/, 5];
                return [4 /*yield*/, connection.query("UPDATE Competitions SET Pernyataan_Origalitas = ? WHERE RegistrationID = ?", [Pernyataan_Origalitas, RegistrationID])];
            case 4:
                _a.sent();
                console.log("Update Pernyataan_Originalitas:", Pernyataan_Origalitas);
                _a.label = 5;
            case 5:
                if (!(Proposal !== "")) return [3 /*break*/, 7];
                return [4 /*yield*/, connection.query("UPDATE Competitions SET Proposal = ? WHERE RegistrationID = ?", [Proposal, RegistrationID])];
            case 6:
                _a.sent();
                console.log("Update Proposal:", Proposal);
                _a.label = 7;
            case 7:
                if (!(Dokumen_Substansi !== "")) return [3 /*break*/, 9];
                return [4 /*yield*/, connection.query("UPDATE Competitions SET Dokumen_Substansi = ? WHERE RegistrationID = ?", [Dokumen_Substansi, RegistrationID])];
            case 8:
                _a.sent();
                console.log("Update Dokumen_Substansi:", Dokumen_Substansi);
                _a.label = 9;
            case 9:
                if (!(title !== "")) return [3 /*break*/, 11];
                return [4 /*yield*/, connection.query("UPDATE Competitions SET title = ? WHERE RegistrationID = ?", [title, RegistrationID])];
            case 10:
                _a.sent();
                console.log("Update title:", title);
                _a.label = 11;
            case 11: return [4 /*yield*/, connection.commit()];
            case 12:
                _a.sent();
                return [2 /*return*/, 200];
            case 13:
                error_1 = _a.sent();
                return [4 /*yield*/, connection.rollback()];
            case 14:
                _a.sent();
                console.error("Error updating Competitions data:", error_1);
                return [2 /*return*/, 500];
            case 15:
                connection.release();
                return [7 /*endfinally*/];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.inputDataCompetitions = inputDataCompetitions;
var checkCompetitionsByRegistrationID = function (RegistrationID) { return __awaiter(void 0, void 0, void 0, function () {
    var dataCompetitions, _a, Pernyataan_Originalitas, Proposal, Dokumen_Substansi, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.DBconnection.query("SELECT Pernyataan_Origalitas, Proposal, Dokumen_Substansi FROM Competitions WHERE RegistrationID = ?", [RegistrationID])];
            case 1:
                dataCompetitions = (_b.sent())[0];
                if (dataCompetitions.length === 0) {
                    console.error("Data untuk RegistrationID ".concat(RegistrationID, " tidak ditemukan"));
                    return [2 /*return*/, 0];
                }
                _a = dataCompetitions[0], Pernyataan_Originalitas = _a.Pernyataan_Originalitas, Proposal = _a.Proposal, Dokumen_Substansi = _a.Dokumen_Substansi;
                if (Pernyataan_Originalitas !== "" &&
                    Proposal !== "" &&
                    Dokumen_Substansi !== "") {
                    console.log(" user sudah mengupload document ");
                    return [2 /*return*/, 1];
                }
                else {
                    console.log(" user belum mengupload document ");
                    return [2 /*return*/, 0];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error("Error checking Competitions data:", error_2);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkCompetitionsByRegistrationID = checkCompetitionsByRegistrationID;
var getAllCompetitions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Competitions")];
            case 1:
                rows = (_a.sent())[0];
                return [2 /*return*/, rows];
        }
    });
}); };
exports.getAllCompetitions = getAllCompetitions;
var uploadDocument = function (registrationID, proposal, dokumenSubstansi, pernyataanOriginalitas) { return __awaiter(void 0, void 0, void 0, function () {
    var DataRegister, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.DBconnection.query("SELECT * FROM Register WHERE RegistrationID = ? AND Status_Registrasi = 1", [registrationID])];
            case 1:
                DataRegister = (_a.sent())[0];
                if (DataRegister.length === 0) {
                    return [2 /*return*/, 404];
                }
                return [4 /*yield*/, db_1.DBconnection.query("UPDATE Competitions \n       SET Proposal = ?, Dokumen_Substansi = ?, Pernyataan_Origalitas = ? \n       WHERE RegistrationID = ?", [
                        proposal,
                        dokumenSubstansi,
                        pernyataanOriginalitas,
                        registrationID,
                    ])];
            case 2:
                _a.sent();
                return [2 /*return*/, 200];
            case 3:
                error_3 = _a.sent();
                console.error("Error uploading document:", error_3);
                return [2 /*return*/, 500];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadDocument = uploadDocument;
var createCompetitions = function (RegistrationID, title) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.DBconnection.query("INSERT INTO Competitions \n      (RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title)\n      VALUES (?, '', '', '', ?)", [RegistrationID, title])];
            case 1:
                result = (_a.sent())[0];
                if (result.affectedRows > 0) {
                    return [2 /*return*/, 1];
                }
                else {
                    return [2 /*return*/, 0];
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error inserting data into Competitions:", error_4);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCompetitions = createCompetitions;
