import { DBconnection } from "../config/db";
export const addMemberTeam = async (RegistrationID, newDataTeam) => {
    const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = newDataTeam;
    const [result] = await DBconnection.query(`UPDATE Team 
        SET Nama_Anggota2 = ?, NIM_Anggota2 = ?, Nama_Anggota3 = ?, NIM_Anggota3 = ?
        WHERE RegistrationID = ?`, [
        Nama_Anggota2,
        NIM_Anggota2,
        Nama_Anggota3,
        NIM_Anggota3,
        RegistrationID,
    ]);
    if (result.affectedRows > 0) {
        const [updatedTeam] = await DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
        return updatedTeam[0];
    }
    return null;
};
export const getTeamByID = async (RegistrationID) => {
    const [dataTeam] = await DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
export const getTeamNameByID = async (RegistrationID) => {
    const [dataTeam] = await DBconnection.query("SELECT Nama_Team FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
export const getAllTeams = async () => {
    const [dataTeams] = await DBconnection.query("SELECT * FROM Team");
    return dataTeams;
};
// getone
export const getOneTeam = async (TeamID) => {
    const [dataTeam] = await DBconnection.query("SELECT * FROM Team WHERE TeamID = ? ", [TeamID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
// create team
