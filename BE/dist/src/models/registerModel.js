"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegister = exports.updateRegister = exports.getSingleRegister = exports.getAllRegisters = exports.checkStatusRegistrasi = exports.logout = exports.login = exports.createRegister = exports.changeStatusRegistrasi = exports.checkStatusRegistrasiWithExpectedStatus = exports.checkNama = exports.checkNomorTelfon = exports.checkNIM = exports.checkNamaTeam = exports.checkEmail = void 0;
const db_1 = require("../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateID_1 = require("../utils/generateID");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// fungsi buat mengecek apakah email sudah terdaftar atau belum mengembalikan number
const checkEmail = async (Email) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Email = ?", [Email]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
exports.checkEmail = checkEmail;
// fungsi buat cek apakah Nama_Team sudah terdaftar atau belum
const checkNamaTeam = async (Nama_Team) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Nama_Team = ?", [Nama_Team]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
exports.checkNamaTeam = checkNamaTeam;
// fungsi buat cek nomor induk mahasiswa sudah terdaftar atau belum
const checkNIM = async (Nomor_Induk_Mahasiswa) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Nomor_Induk_Mahasiswa = ?", [Nomor_Induk_Mahasiswa]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
exports.checkNIM = checkNIM;
// fungsi buat cek nomor telfon sudah terdaftar atau belum
const checkNomorTelfon = async (Nomor_Telfon) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Nomor_Telfon = ?", [Nomor_Telfon]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
exports.checkNomorTelfon = checkNomorTelfon;
// fungsi buat cek nama sudah terdaftar atau belum
const checkNama = async (Nama) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Nama = ?", [Nama]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
exports.checkNama = checkNama;
// fungsi untuk cek Status_Registrasi
const checkStatusRegistrasiWithExpectedStatus = async (RegistrationID, expect_status) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataRegister.length > 0) {
        if (dataRegister[0].Status_Registrasi === expect_status) {
            return expect_status;
        }
        else {
            return 500;
        }
    }
    else {
        return 500;
    }
};
exports.checkStatusRegistrasiWithExpectedStatus = checkStatusRegistrasiWithExpectedStatus;
// fungsi untuk merubah status
const changeStatusRegistrasi = async (RegistrationID, newStatus) => {
    await db_1.DBconnection.query("UPDATE Register SET Status_Registrasi = ? WHERE RegistrationID = ?", [newStatus, RegistrationID]);
};
exports.changeStatusRegistrasi = changeStatusRegistrasi;
// fungsi untuk input data registrasi
const createRegister = async (newRegister) => {
    const { RegistrationID, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, } = newRegister;
    await db_1.DBconnection.query(`INSERT INTO Register 
            (RegistrationID,Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token) 
            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
    ]);
    // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await db_1.DBconnection.query(`INSERT INTO Team (TeamID,RegistrationID,Nama_Anggota1,NIM_Anggota1) VALUES (?,?,?,?)`, [
        (0, generateID_1.generateID)(),
        newRegister.RegistrationID,
        Nama,
        Nomor_Induk_Mahasiswa,
    ]);
    // pengondisian Pilihan_Lomba
    let Competitions = "";
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
    if (Competitions) {
        await db_1.DBconnection.query("INSERT INTO Competitions (CompetitionsID, RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title) VALUES (?, ?, ?,?, ?, ?)", [
            (0, generateID_1.generateID)(),
            newRegister.RegistrationID,
            "",
            "",
            "",
            Competitions,
        ]);
    }
    // ngbuat table Administrative dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await db_1.DBconnection.query(`INSERT INTO Administrative 
            (AdministrativeID ,RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, ?, ?, ?, ?)`, [(0, generateID_1.generateID)(), newRegister.RegistrationID, "", "", ""]);
    return 201;
};
exports.createRegister = createRegister;
// login
const login = async (Email, Password) => {
    try {
        const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE Email = ? AND Password = ?", [Email, Password]);
        if (dataRegister.length > 0) {
            const token = jsonwebtoken_1.default.sign({ RegistrationID: dataRegister[0].RegistrationID }, process.env.SECRET_KEY, { expiresIn: "3h" }); // Token sampe 3 jam
            // ngisi token di table Register
            await db_1.DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [token, dataRegister[0].RegistrationID]);
            // Tambahkan token ke objek yang akan dikembalikan
            dataRegister[0].token = token;
            return dataRegister[0];
        }
        else {
            return null; // Email atau password salah
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        throw new Error("Error during login process");
    }
};
exports.login = login;
// logout
const logout = async (RegistrationID) => {
    await db_1.DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [null, RegistrationID]);
};
exports.logout = logout;
// fungsi untuk cek status registrasi yang mertun string status_registrasi ("sudah" atau "belum")
const checkStatusRegistrasi = async (RegistrationID) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataRegister.length > 0) {
        if (dataRegister[0].Status_Registrasi === 1) {
            return "sudah";
        }
        else {
            return "belum";
        }
    }
    else {
        return "data tidak ditemukan";
    }
};
exports.checkStatusRegistrasi = checkStatusRegistrasi;
// admin
const getAllRegisters = async () => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register");
    return dataRegister;
};
exports.getAllRegisters = getAllRegisters;
const getSingleRegister = async (RegistrationID) => {
    const [dataRegister] = await db_1.DBconnection.query("SELECT * FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataRegister.length > 0) {
        return dataRegister[0];
    }
    else {
        return null;
    }
};
exports.getSingleRegister = getSingleRegister;
const updateRegister = async (RegistrationID, updatedRegister) => {
    const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, } = updatedRegister;
    await db_1.DBconnection.query(`UPDATE Register SET 
    Nama = COALESCE(?, Nama),
    Nomor_Telfon = COALESCE(?, Nomor_Telfon),
    Nama_Instansi = COALESCE(?, Nama_Instansi),
    Nama_Team = COALESCE(?, Nama_Team),
    Nomor_Induk_Mahasiswa = COALESCE(?, Nomor_Induk_Mahasiswa),
    Email = COALESCE(?, Email),
    Provinsi = COALESCE(?, Provinsi),
    Kabupaten = COALESCE(?, Kabupaten),
    Password = COALESCE(?, Password),
    Pilihan_Lomba = COALESCE(?, Pilihan_Lomba),
    Status_Registrasi = COALESCE(?, Status_Registrasi)
    WHERE RegistrationID = ?`, [
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
    ]);
};
exports.updateRegister = updateRegister;
const deleteRegister = async (RegistrationID) => {
    await db_1.DBconnection.query("DELETE FROM Register WHERE RegistrationID = ?", [
        RegistrationID,
    ]);
};
exports.deleteRegister = deleteRegister;
