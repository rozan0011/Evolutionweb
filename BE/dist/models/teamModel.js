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
exports.getOneTeam = exports.getAllTeams = exports.getTeamNameByID = exports.getTeamByID = exports.addMemberTeam = void 0;
const db_1 = require("../config/db");
const addMemberTeam = (RegistrationID, newDataTeam) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = newDataTeam;
    const [result] = yield db_1.DBconnection.query(`UPDATE Team 
        SET Nama_Anggota2 = ?, NIM_Anggota2 = ?, Nama_Anggota3 = ?, NIM_Anggota3 = ?
        WHERE RegistrationID = ?`, [
        Nama_Anggota2,
        NIM_Anggota2,
        Nama_Anggota3,
        NIM_Anggota3,
        RegistrationID,
    ]);
    if (result.affectedRows > 0) {
        const [updatedTeam] = yield db_1.DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
        return updatedTeam[0];
    }
    return null;
});
exports.addMemberTeam = addMemberTeam;
const getTeamByID = (RegistrationID) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeam] = yield db_1.DBconnection.query("SELECT * FROM Team WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
});
exports.getTeamByID = getTeamByID;
const getTeamNameByID = (RegistrationID) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeam] = yield db_1.DBconnection.query("SELECT Nama_Team FROM Register WHERE RegistrationID = ?", [RegistrationID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
});
exports.getTeamNameByID = getTeamNameByID;
const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeams] = yield db_1.DBconnection.query("SELECT * FROM Team");
    return dataTeams;
});
exports.getAllTeams = getAllTeams;
// getone
const getOneTeam = (TeamID) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataTeam] = yield db_1.DBconnection.query("SELECT * FROM Team WHERE TeamID = ? ", [TeamID]);
    if (dataTeam.length > 0) {
        return dataTeam[0];
    }
    else {
        return null;
    }
});
exports.getOneTeam = getOneTeam;
// create team
