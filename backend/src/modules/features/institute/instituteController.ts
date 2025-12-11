import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import generateInstituteRandomNumbers from "../../global/services/generateRandomNumber";


const createInstitute = async (req: Request, res: Response) => {
    console.log("triggered institute creation code");
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    const { instituteVatNumber } = req.body || null;
    const { institutePanNumber } = req.body || null;
    // console.log("details", instituteName, instituteEmail, institutePhoneNumber, instituteAddress)

    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
        return res.status(400).json({
            message: "Provide all the required fields!!"
        })
    };

    try {
        const instituteNumber = generateInstituteRandomNumbers();
        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
         id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
         instituteName VARCHAR(225) NOT NULL, 
         instituteEmail VARCHAR(225) NOT NULL, 
         institutePhoneNumber VARCHAR(225) NOT NULL, 
         instituteAddress VARCHAR(225) NOT NULL,
         instituteVatNumber VARCHAR(225) , 
         institutePanNumber VARCHAR(225) ,
         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )`);

        await sequelize.query(`INSERT`)

        // make a database for institute and teacher


        res.status(200).json({
            message: "Institute created"
        });
    } catch (error) {
        console.error("failed to create institute server error", (error as Error).stack);
    };
};

export { createInstitute };