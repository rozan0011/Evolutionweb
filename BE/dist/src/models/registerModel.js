import { DBconnection } from "../config/db";
import jsonwebtoken from "jsonwebtoken";
import { generateID } from "../utils/generateID";
import env from "dotenv";
env.config();
// fungsi buat mengecek apakah email sudah terdaftar atau belum mengembalikan number
export const checkEmail = async (Email) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Email = ?", [Email]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
// fungsi buat cek apakah Nama_Team sudah terdaftar atau belum
export const checkNamaTeam = async (Nama_Team) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Nama_Team = ?", [Nama_Team]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
// fungsi buat cek nomor induk mahasiswa sudah terdaftar atau belum
export const checkNIM = async (Nomor_Induk_Mahasiswa) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Nomor_Induk_Mahasiswa = ?", [Nomor_Induk_Mahasiswa]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
// fungsi buat cek nomor telfon sudah terdaftar atau belum
export const checkNomorTelfon = async (Nomor_Telfon) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Nomor_Telfon = ?", [Nomor_Telfon]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
// fungsi buat cek nama sudah terdaftar atau belum
export const checkNama = async (Nama) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Nama = ?", [Nama]);
    if (dataRegister.length > 0) {
        return 401;
    }
    else {
        return 200;
    }
};
// fungsi untuk cek Status_Registrasi
export const checkStatusRegistrasiWithExpectedStatus = async (RegistrationID, expect_status) => {
    const [dataRegister] = await DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID]);
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
// fungsi untuk merubah status
export const changeStatusRegistrasi = async (RegistrationID, newStatus) => {
    await DBconnection.query("UPDATE Register SET Status_Registrasi = ? WHERE RegistrationID = ?", [newStatus, RegistrationID]);
};
// fungsi untuk input data registrasi
export const createRegister = async (newRegister) => {
    const { RegistrationID, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, } = newRegister;
    await DBconnection.query(`INSERT INTO Register 
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
    await DBconnection.query(`INSERT INTO Team (TeamID,RegistrationID,Nama_Anggota1,NIM_Anggota1) VALUES (?,?,?,?)`, [
        generateID(),
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
        await DBconnection.query("INSERT INTO Competitions (CompetitionsID, RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title) VALUES (?, ?, ?,?, ?, ?)", [
            generateID(),
            newRegister.RegistrationID,
            "",
            "",
            "",
            Competitions,
        ]);
    }
    // ngbuat table Administrative dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await DBconnection.query(`INSERT INTO Administrative 
            (AdministrativeID ,RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, ?, ?, ?, ?)`, [generateID(), newRegister.RegistrationID, "", "", ""]);
    return 201;
};
// login
export const login = async (Email, Password) => {
    try {
        const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE Email = ? AND Password = ?", [Email, Password]);
        if (dataRegister.length > 0) {
            const token = jsonwebtoken.sign({ RegistrationID: dataRegister[0].RegistrationID }, process.env.SECRET_KEY, { expiresIn: "3h" }); // Token sampe 3 jam
            // ngisi token di table Register
            await DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [token, dataRegister[0].RegistrationID]);
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
// logout
export const logout = async (RegistrationID) => {
    await DBconnection.query("UPDATE Register SET token = ? WHERE RegistrationID = ?", [null, RegistrationID]);
};
// fungsi untuk cek status registrasi yang mertun string status_registrasi ("sudah" atau "belum")
export const checkStatusRegistrasi = async (RegistrationID) => {
    const [dataRegister] = await DBconnection.query("SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?", [RegistrationID]);
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
// admin
export const getAllRegisters = async () => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register");
    return dataRegister;
};
export const getSingleRegister = async (RegistrationID) => {
    const [dataRegister] = await DBconnection.query("SELECT * FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataRegister.length > 0) {
        return dataRegister[0];
    }
    else {
        return null;
    }
};
export const updateRegister = async (RegistrationID, updatedRegister) => {
    const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, } = updatedRegister;
    await DBconnection.query(`UPDATE Register SET 
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
export const deleteRegister = async (RegistrationID) => {
    await DBconnection.query("DELETE FROM Register WHERE RegistrationID = ?", [
        RegistrationID,
    ]);
};
