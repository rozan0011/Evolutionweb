import { DBconnection } from '../config/db';
export const getAllFinalis = async () => {
    const [dataFinalis] = await DBconnection.query('SELECT * FROM Finalis');
    return dataFinalis;
};
// upload document ( dokumen final)
