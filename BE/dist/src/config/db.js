import mysql from "mysql2/promise";
// const port: any = process.env.PORT;
const port = 3306;
export const DBconnection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "evolutiondb",
    port: port,
    waitForConnections: true,
});
