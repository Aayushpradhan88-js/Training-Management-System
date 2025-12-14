import { Response } from "express";
import sequelize from "../../../database/connection";
import generateInstituteRandomNumbers from "../../global/services/generateRandomNumber";
import IExtendedRequest from "../../global/types/types";

// console.log("✅ step 4: SEQULIZE TESTING Triggered");
// console.log("✅ step 5: GENERATE RANDOM NUMBER TESTING Triggered", generateInstituteRandomNumbers());

class instituteController {
    static async createInstitute(req: IExtendedRequest, res: Response) {
        const userData = req.user;
        // console.log("ID DATA FROM MIDDLEWARE", userID?.email); //if email not found send undefined or null
        // console.log("✅ DATA FROM MIDDLEWARE",req.user)
        // console.log("✅ step 6: Institute Creation Triggered");
        console.log("✅ UserData", userData);

        const {
            instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress,
            instituteVatNumber = null,
            institutePanNumber = null
        } = req.body;

        // console.log(
        // instituteName,
        // instituteEmail,
        // institutePhoneNumber,
        // instituteAddress,
        // instituteVatNumber,
        // institutePanNumber
        // )
        // console.log("✅ step 7: VALIDATION Triggered")
        if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            return res.status(400).json({
                message: "Provide all the required fields!!"
            });
        };

        try {
            const instituteNumber = generateInstituteRandomNumbers();
            // console.log(`✅ step 8 : Generated institute number - ${instituteNumber}`);

            // Step 1: Create institute-specific table
            await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
                   id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                   instituteName VARCHAR(255) NOT NULL, 
                   instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
                   institutePhoneNumber VARCHAR(20) NOT NULL, 
                   instituteAddress TEXT NOT NULL,
                   instituteVatNumber VARCHAR(50), 
                   institutePanNumber VARCHAR(50),
                   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )`
            );
            // console.log(`✅ step 9: Table institute_${instituteNumber} created`);

            // console.log(`✅ step 10: Intersting database table`);
            await sequelize.query(`
            INSERT INTO institute_${instituteNumber}(
                instituteName,
                instituteEmail,
                institutePhoneNumber,
                instituteAddress,
                instituteVatNumber,
                institutePanNumber
            ) VALUES (?,?,?,?,?,?)`, {
                replacements: [
                    instituteName,
                    instituteEmail,
                    institutePhoneNumber,
                    instituteAddress,
                    instituteVatNumber,
                    institutePanNumber
                ]
            });
            console.log(`✅step 11: Data insertion complete into institute_${instituteNumber}`);

            return res.status(201).json({
                message: "Institute created successfully"
                // data: {
                //     instituteNumber,
                //     instituteName,
                //     instituteEmail,
                //     tableName: `institute_${instituteNumber}`
                // }
            });

        } catch (error) {
            console.error("✗ Failed to create institute:", (error as Error).stack);
            return res.status(500).json({
                message: "Failed to create institute",
                error: (error as Error).stack
            });
        }
    };
}

export default instituteController;