"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneTeam = exports.getAllTeams = exports.getTeamNameByID = exports.getTeamByID = exports.addMemberTeam = void 0;
const db_1 = require("../config/db");
const addMemberTeam = async (RegistrationID, newDataTeam) => {
    const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = newDataTeam;
    const [result] = await db_1.DBconnection.query(`UPDATE Team 
        SET Nama_Anggota2 = ?, NIM_Anggota2 = ?, Nama_Anggota3 = ?, NIM_Anggota3 = ?
        WHERE RegistrationID = ?`, [
        Nama_Anggota2,
        NIM_Anggota2,
        Nama_Anggota3,
        NIM_Anggota3,
        RegistrationID,
    ]);
    if (result.affectedRows > 0) {
        const [updatedTeam] = await db_1.DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
        return updatedTeam[0];
    }
    return null;
};
exports.addMemberTeam = addMemberTeam;
const getTeamByID = async (RegistrationID) => {
    const [dataTeam] = await db_1.DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
exports.getTeamByID = getTeamByID;
const getTeamNameByID = async (RegistrationID) => {
    const [dataTeam] = await db_1.DBconnection.query("SELECT Nama_Team FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
exports.getTeamNameByID = getTeamNameByID;
const getAllTeams = async () => {
    const [dataTeams] = await db_1.DBconnection.query("SELECT * FROM Team");
    return dataTeams;
};
exports.getAllTeams = getAllTeams;
// getone
const getOneTeam = async (TeamID) => {
    const [dataTeam] = await db_1.DBconnection.query("SELECT * FROM Team WHERE TeamID = ? ", [TeamID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
};
exports.getOneTeam = getOneTeam;
// create team
