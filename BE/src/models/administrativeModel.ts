import { DBconnection } from "../config/db";

export interface Administrative {
    AdministrativeID: number;
    RegistrationID: number;
    Kartu_Tanda_Mahasiswa: string;
    Bukti_post_Twibon: string;
    Bukti_Pembayaran: string;
}

// Function to upload administrative data
export const uploadDataAdministrative = async (
    RegistrationID: number,
    newDataAdministrative: Administrative
): Promise<number> => {
    const { Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran } = newDataAdministrative;

    // Check if administrative data exists for the given RegistrationID
    const [dataAdministrative]: [any[], any] = await DBconnection.query(
        `SELECT * FROM Administrative WHERE RegistrationID = ?`,
        [RegistrationID]
    );

    if (dataAdministrative.length > 0) {
        let hasil: number = 200; // Default to success

        // Update fields only if they are not empty
        if (Kartu_Tanda_Mahasiswa) {
            await DBconnection.query(
                `UPDATE Administrative SET Kartu_Tanda_Mahasiswa = ? WHERE RegistrationID = ?`,
                [Kartu_Tanda_Mahasiswa, RegistrationID]
            );
        }

        if (Bukti_post_Twibon) {
            await DBconnection.query(
                `UPDATE Administrative SET Bukti_post_Twibon = ? WHERE RegistrationID = ?`,
                [Bukti_post_Twibon, RegistrationID]
            );
        }

        if (Bukti_Pembayaran) {
            await DBconnection.query(
                `UPDATE Administrative SET Bukti_Pembayaran = ? WHERE RegistrationID = ?`,
                [Bukti_Pembayaran, RegistrationID]
            );
        }

        return hasil; // Return success status
    } else {
        console.error("Data Administrative tidak ditemukan");
        return 404; // Not found
    }
};

// Function to get all administrative data
export const getAllAdministrative = async (): Promise<Administrative[]> => {
    const [dataAdministrative] = await DBconnection.query(
        "SELECT * FROM Administrative"
    );
    return dataAdministrative as Administrative[]; // Cast to Administrative[]
};

// Function to check if administrative data exists for a given RegistrationID
export const checkAdministrativeByRegistrationID = async (
    RegistrationID: number
): Promise<number> => {
    const [dataAdministrative]: any = await DBconnection.query(
        `SELECT * FROM Administrative WHERE RegistrationID = ?`,
        [RegistrationID]
    );

    // Check if data exists and all fields are filled
    if (dataAdministrative.length > 0 &&
        dataAdministrative[0].Kartu_Tanda_Mahasiswa &&
        dataAdministrative[0].Bukti_post_Twibon &&
        dataAdministrative[0].Bukti_Pembayaran) {
        return 1; // All fields are filled
    } else {
        return 0; // Not all fields are filled or no data found
    }
};

// Function to create administrative data for a given RegistrationID
export const createAdministrative = async (
    RegistrationID: number
): Promise<number> => {
    try {
        const [result]: any = await DBconnection.query(
            `INSERT INTO Administrative 
            (RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, '', '', '')`,
            [RegistrationID]
        );

        if (result.affectedRows > 0) {
            return 1; // Successfully inserted
        } else {
            return 0; // Insertion failed
        }
    } catch (error) {
        console.error("Error inserting data into Administrative:", error);
        return 0; // Insertion failed
    }
};