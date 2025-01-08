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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompetitions = exports.uploadDocument = exports.getAllCompetitions = exports.checkCompetitionsByRegistrationID = exports.inputDataCompetitions = void 0;
const db_1 = require("../config/db");
const inputDataCompetitions = (RegistrationID, newDataCompetitions) => __awaiter(void 0, void 0, void 0, function* () {
    const { Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title } = newDataCompetitions;
    const connection = yield db_1.DBconnection.getConnection();
    try {
        yield connection.beginTransaction();
        if (Pernyataan_Origalitas !== "") {
            yield connection.query(`UPDATE Competitions SET Pernyataan_Origalitas = ? WHERE RegistrationID = ?`, [Pernyataan_Origalitas, RegistrationID]);
            console.log("Update Pernyataan_Originalitas:", Pernyataan_Origalitas);
        }
        if (Proposal !== "") {
            yield connection.query(`UPDATE Competitions SET Proposal = ? WHERE RegistrationID = ?`, [Proposal, RegistrationID]);
            console.log("Update Proposal:", Proposal);
        }
        if (Dokumen_Substansi !== "") {
            yield connection.query(`UPDATE Competitions SET Dokumen_Substansi = ? WHERE RegistrationID = ?`, [Dokumen_Substansi, RegistrationID]);
            console.log("Update Dokumen_Substansi:", Dokumen_Substansi);
        }
        if (title !== "") {
            yield connection.query(`UPDATE Competitions SET title = ? WHERE RegistrationID = ?`, [title, RegistrationID]);
            console.log("Update title:", title);
        }
        yield connection.commit();
        return 200;
    }
    catch (error) {
        yield connection.rollback();
        console.error("Error updating Competitions data:", error);
        return 500;
    }
    finally {
        connection.release();
    }
});
exports.inputDataCompetitions = inputDataCompetitions;
const checkCompetitionsByRegistrationID = (RegistrationID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [dataCompetitions] = yield db_1.DBconnection.query(`SELECT Pernyataan_Origalitas, Proposal, Dokumen_Substansi FROM Competitions WHERE RegistrationID = ?`, [RegistrationID]);
        if (dataCompetitions.length === 0) {
            console.error(`Data untuk RegistrationID ${RegistrationID} tidak ditemukan`);
            return 0;
        }
        const { Pernyataan_Originalitas, Proposal, Dokumen_Substansi } = dataCompetitions[0];
        if (Pernyataan_Originalitas !== "" &&
            Proposal !== "" &&
            Dokumen_Substansi !== "") {
            console.log(" user sudah mengupload document ");
            return 1;
        }
        else {
            console.log(" user belum mengupload document ");
            return 0;
        }
    }
    catch (error) {
        console.error("Error checking Competitions data:", error);
        return 0;
    }
});
exports.checkCompetitionsByRegistrationID = checkCompetitionsByRegistrationID;
const getAllCompetitions = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.DBconnection.query("SELECT * FROM Competitions");
    return rows;
});
exports.getAllCompetitions = getAllCompetitions;
const uploadDocument = (registrationID, proposal, dokumenSubstansi, pernyataanOriginalitas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [DataRegister] = yield db_1.DBconnection.query("SELECT * FROM Register WHERE RegistrationID = ? AND Status_Registrasi = 1", [registrationID]);
        if (DataRegister.length === 0) {
            return 404;
        }
        yield db_1.DBconnection.query(`UPDATE Competitions 
       SET Proposal = ?, Dokumen_Substansi = ?, Pernyataan_Origalitas = ? 
       WHERE RegistrationID = ?`, [
            proposal,
            dokumenSubstansi,
            pernyataanOriginalitas,
            registrationID,
        ]);
        return 200;
    }
    catch (error) {
        console.error("Error uploading document:", error);
        return 500;
    }
});
exports.uploadDocument = uploadDocument;
const createCompetitions = (RegistrationID, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.DBconnection.query(`INSERT INTO Competitions 
      (RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title)
      VALUES (?, '', '', '', ?)`, [RegistrationID, title]);
        if (result.affectedRows > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        console.error("Error inserting data into Competitions:", error);
        return 0;
    }
});
exports.createCompetitions = createCompetitions;
