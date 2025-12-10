import { Request, Response } from "express";
import sequelize from "../../../database/connection";


const createInstitute = async (req: Request, res: Response) => {
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    const { instituteVatNumber } = req.body || null;
    const { institutePanNumber } = req.body || null;

    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
        return res.status(400).json({
            message: "Provide all the required fields!!"
        })
    };

    await sequelize.query(`CREATE TABLE IF NOT EXIST(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        instituteName VARCHAR(225) NOT NULL, 
        instituteEmail VARCHAR(225) NOT NULL, 
        institutePhoneNumber VARCHAR(225) NOT NULL, 
        instituteAddress VARCHAR(225) NOT NULL,
        instituteVatNumber VARCHAR(225) , 
        institutePanNumber VARCHAR(225) ,
        createdAt TIMESTAMP DEFAULT CURRENT_TIME ,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIME ON UPDATE CURRENT_TIMESTAMP
        )`);

    // make a database for institute and teacher


    res.status(200).json({
        message: "Institute created"
    })
};

export {createInstitute};