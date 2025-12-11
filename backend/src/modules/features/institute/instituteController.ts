import { Request, Response } from "express";
import sequelize from "../../../database/connection";
// import generateInstituteRandomNumbers from "../../global/services/generateRandomNumber";

console.log("✅ step 6: logginG db", sequelize)
// console.log("✅ step 7: Random number", generateInstituteRandomNumbers)


// export const createInstitute = async (req: Request, res: Response) => {
//     console.log("✅ step 8: Triggered Institute Creation")

//     // Fix: Proper destructuring with defaults
//     const {
//         instituteName,
//         instituteEmail,
//         institutePhoneNumber,
//         instituteAddress,
//         instituteVatNumber = null,
//         institutePanNumber = null
//     } = req.body;

//     console.log("✅ step 9: VALIDATION STARTED")
//     // Validation
//     if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
//         return res.status(400).json({
//             message: "Provide all the required fields!!"
//         });
//     }

//     try {
//         // Generate unique institute number
//         // const instituteNumber = generateInstituteRandomNumbers();
//         const instituteNumber = () => {
//              Math.floor(10000 + Math.random() * 30000)
//         };
//         console.log(`step 10 ✓ Generated institute number: ${instituteNumber}`);

//         // Step 1: Create institute-specific table
//         await sequelize.query(`
//             CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
//                 id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
//                 instituteName VARCHAR(255) NOT NULL, 
//                 instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
//                 institutePhoneNumber VARCHAR(20) NOT NULL, 
//                 instituteAddress TEXT NOT NULL,
//                 instituteVatNumber VARCHAR(50), 
//                 institutePanNumber VARCHAR(50),
//                 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//             )
//         `);
//         console.log(`✓ Table institute_${instituteNumber} created`);

//         // Step 2: Insert institute data into the new table
//         // await sequelize.query(`
//         //     INSERT INTO institute_${instituteNumber} 
//         //     (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNumber, institutePanNumber) 
//         //     VALUES (?, ?, ?, ?, ?, ?)
//         // `, {
//         //     replacements: [
//         //         instituteName, 
//         //         instituteEmail, 
//         //         institutePhoneNumber, 
//         //         instituteAddress, 
//         //         instituteVatNumber, 
//         //         institutePanNumber
//         //     ]
//         // });
//         console.log(`✓ Data inserted into institute_${instituteNumber}`);

//         // Step 3: Optionally, store institute metadata in main table
//         // await sequelize.query(`
//         //     CREATE TABLE IF NOT EXISTS institute_table (
//         //         id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
//         //         instituteNumber INT UNIQUE NOT NULL,
//         //         instituteName VARCHAR(255) NOT NULL,
//         //         instituteEmail VARCHAR(255) NOT NULL UNIQUE,
//         //         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         //     )
//         // `);

//         // await sequelize.query(`
//         //     INSERT INTO institute_table (instituteNumber, instituteName, instituteEmail) 
//         //     VALUES (?, ?, ?)
//         // `, {
//         //     replacements: [instituteNumber, instituteName, instituteEmail]
//         // });
//         // console.log(`✓ Metadata stored in institute_table`);

//         // Send success response
//         return res.status(201).json({
//             message: "Institute created successfully"
//             // data: {
//             //     instituteNumber,
//             //     instituteName,
//             //     instituteEmail,
//             //     tableName: `institute_${instituteNumber}`
//             // }
//         });

//     } catch (error) {
//         console.error("✗ Failed to create institute:", (error as Error).stack);

//         // CRITICAL: Always send a response in catch block!
//         return res.status(500).json({
//             message: "Failed to create institute",
//             error: (error as Error).message
//         });
//     }
// };

// export { createInstitute };












































 export const createInstitute = async (req: Request, res: Response) => {
        console.log("🔥 ROUTE HIT - TEST MODE");
    console.log("Body:", req.body);
    
    return res.status(200).json({
        message: "Test successful - route is working!",
        receivedData: req.body
    });
    
 }