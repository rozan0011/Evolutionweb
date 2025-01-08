import jwt from "jsonwebtoken";
import { uploadFile } from "../config/fileUpload";
import { getAllAdministrative, uploadDataAdministrative, checkAdministrativeByRegistrationID, } from "../models/administrativeModel";
import { checkStatusRegistrasiWithExpectedStatus, changeStatusRegistrasi, } from "../models/registerModel";
export const uploadAdministrativeController = async (req, res) => {
    try {
        // JWT Authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token tidak ditemukan atau tidak valid",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.RegistrationID) {
            return res.status(400).json({ message: "Token tidak valid" });
        }
        const RegistrationID = decoded.RegistrationID;
        // Check registration status
        const statusCheck = await checkStatusRegistrasiWithExpectedStatus(RegistrationID, 1);
        if (statusCheck !== 1) {
            return res.status(400).json({ message: "Status registrasi tidak valid" });
        }
        // File validation
        const files = req.files;
        if (!files.Kartu_Tanda_Mahasiswa || !files.Bukti_post_Twibon || !files.Bukti_Pembayaran) {
            return res.status(400).json({ message: "File tidak lengkap" });
        }
        // Upload files to Cloudinary
        const kartuTandaMahasiswaUrl = await uploadFile(files.Kartu_Tanda_Mahasiswa[0].buffer, "Kartu_Tanda_Mahasiswa");
        const buktiPostTwibonUrl = await uploadFile(files.Bukti_post_Twibon[0].buffer, "Bukti_post_Twibon");
        const buktiPembayaranUrl = await uploadFile(files.Bukti_Pembayaran[0].buffer, "Bukti_Pembayaran");
        // Prepare data for database
        const newDataAdministrative = {
            AdministrativeID: 0,
            RegistrationID,
            Kartu_Tanda_Mahasiswa: kartuTandaMahasiswaUrl,
            Bukti_post_Twibon: buktiPostTwibonUrl,
            Bukti_Pembayaran: buktiPembayaranUrl,
        };
        // Save data to database
        await uploadDataAdministrative(RegistrationID, newDataAdministrative);
        await changeStatusRegistrasi(RegistrationID, 2);
        return res.status(200).json({
            message: "Documents uploaded successfully.",
            data: newDataAdministrative,
        });
    }
    catch (error) {
        console.error("Error in uploadAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while uploading documents.",
        });
    }
};
export const checkAdministrativeController = async (req, res) => {
    try {
        // JWT Authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token tidak ditemukan atau tidak valid",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.RegistrationID) {
            return res.status(400).json({ message: "Token tidak valid" });
        }
        const RegistrationID = decoded.RegistrationID;
        const exists = await checkAdministrativeByRegistrationID(RegistrationID);
        if (exists === 1) {
            return res.json({ message: "Data ditemukan", exists: true });
        }
        else {
            return res.json({ message: "Data tidak ditemukan", exists: false });
        }
    }
    catch (error) {
        console.error("Error in checkAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while checking administrative data.",
        });
    }
};
export const getAllAdministrativeController = async (req, res) => {
    try {
        const administrativeData = await getAllAdministrative();
        return res.json(administrativeData);
    }
    catch (error) {
        console.error("Error in getAllAdministrativeController:", error);
        res.status(500).json({
            message: "An error occurred while retrieving administrative data.",
        });
    }
};
