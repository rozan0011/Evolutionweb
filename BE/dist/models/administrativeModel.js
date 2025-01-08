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
exports.createAdministrative = exports.checkAdministrativeByRegistrationID = exports.getAllAdministrative = exports.uploadDataAdministrative = void 0;
const db_1 = require("../config/db");
// Function to upload administrative data
const uploadDataAdministrative = (RegistrationID, newDataAdministrative) => __awaiter(void 0, void 0, void 0, function* () {
    const { Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran } = newDataAdministrative;
    // Check if administrative data exists for the given RegistrationID
    const [dataAdministrative] = yield db_1.DBconnection.query(`SELECT * FROM Administrative WHERE RegistrationID = ?`, [RegistrationID]);
    if (dataAdministrative.length > 0) {
        let hasil = 200; // Default to success
        // Update fields only if they are not empty
        if (Kartu_Tanda_Mahasiswa) {
            yield db_1.DBconnection.query(`UPDATE Administrative SET Kartu_Tanda_Mahasiswa = ? WHERE RegistrationID = ?`, [Kartu_Tanda_Mahasiswa, RegistrationID]);
        }
        if (Bukti_post_Twibon) {
            yield db_1.DBconnection.query(`UPDATE Administrative SET Bukti_post_Twibon = ? WHERE RegistrationID = ?`, [Bukti_post_Twibon, RegistrationID]);
        }
        if (Bukti_Pembayaran) {
            yield db_1.DBconnection.query(`UPDATE Administrative SET Bukti_Pembayaran = ? WHERE RegistrationID = ?`, [Bukti_Pembayaran, RegistrationID]);
        }
        return hasil; // Return success status
    }
    else {
        console.error("Data Administrative tidak ditemukan");
        return 404; // Not found
    }
});
exports.uploadDataAdministrative = uploadDataAdministrative;
// Function to get all administrative data
const getAllAdministrative = () => __awaiter(void 0, void 0, void 0, function* () {
    const [dataAdministrative] = yield db_1.DBconnection.query("SELECT * FROM Administrative");
    return dataAdministrative; // Cast to Administrative[]
});
exports.getAllAdministrative = getAllAdministrative;
// Function to check if administrative data exists for a given RegistrationID
const checkAdministrativeByRegistrationID = (RegistrationID) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataAdministrative] = yield db_1.DBconnection.query(`SELECT * FROM Administrative WHERE RegistrationID = ?`, [RegistrationID]);
    // Check if data exists and all fields are filled
    if (dataAdministrative.length > 0 &&
        dataAdministrative[0].Kartu_Tanda_Mahasiswa &&
        dataAdministrative[0].Bukti_post_Twibon &&
        dataAdministrative[0].Bukti_Pembayaran) {
        return 1; // All fields are filled
    }
    else {
        return 0; // Not all fields are filled or no data found
    }
});
exports.checkAdministrativeByRegistrationID = checkAdministrativeByRegistrationID;
// Function to create administrative data for a given RegistrationID
const createAdministrative = (RegistrationID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.DBconnection.query(`INSERT INTO Administrative 
            (RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, '', '', '')`, [RegistrationID]);
        if (result.affectedRows > 0) {
            return 1; // Successfully inserted
        }
        else {
            return 0; // Insertion failed
        }
    }
    catch (error) {
        console.error("Error inserting data into Administrative:", error);
        return 0; // Insertion failed
    }
});
exports.createAdministrative = createAdministrative;
