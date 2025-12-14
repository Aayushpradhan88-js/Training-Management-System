import { NextFunction, Response } from "express";
import sequelize from "../../../database/connection";
import generateInstituteRandomNumbers from "../../global/services/generateRandomNumber";
import IExtendedRequest from "../../global/types/types";
import { User } from "../../../database/models/userModel";

// console.log("✅ step 4: SEQULIZE TESTING Triggered");
// console.log("✅ step 5: GENERATE RANDOM NUMBER TESTING Triggered", generateInstituteRandomNumbers());

class instituteController {
    static async createInstitute(req: IExtendedRequest, res: Response, next: NextFunction) {
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

            await sequelize.query(`
                CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
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

            console.log("✅user history triggered")
            //storing user history table creation
            await sequelize.query(`
                CREATE TABLE IF NOT EXIST user_history(
                    id VARCHAR(55) AUTO_INCREMENT,
                    userId VARCHAR(255) NOT NULL REFERENCES user(id),
                    instituteNumber VARCHAR(255) NOT NULL
                )`
            );
            //inserting data to user history table
            if (req.user) {
                await sequelize.query(
                    `INSERT INTO user_history(
                        id,
                        userId,
                        instituteNumber
                    ), VALUE(?,?,?)`, {
                    replacements: [req.user?.id, instituteNumber]
                });
            };
            console.log("✅user history table created");

            const user = await User.findByPk(req.user?.id); //finding user
            if (!user) {
                return res.status(404).json({ message: "User not found!!" })
            };
            //updating instituteNumber in user table
            user.currentInstituteNumber = String(instituteNumber);
            await user?.save();
            console.log("✅currentInstituteNumber data is updated");

            next();
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