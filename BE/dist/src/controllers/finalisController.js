import { getAllFinalis } from "../models/finalisModel";
export const getAllFinalisController = async (req, res) => {
    try {
        const finalis = await getAllFinalis();
        res.json(finalis);
    }
    catch (error) {
        console.error(error, "\n   backend error broo bagian finalis controller");
        res.status(500).json({ message: "backend error broo bagian finalis" });
    }
};
