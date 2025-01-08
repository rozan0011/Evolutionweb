"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFinalis = void 0;
const db_1 = require("../config/db");
const getAllFinalis = async () => {
    const [dataFinalis] = await db_1.DBconnection.query('SELECT * FROM Finalis');
    return dataFinalis;
};
exports.getAllFinalis = getAllFinalis;
// upload document ( dokumen final)
