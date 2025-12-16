import { NextFunction, Request, Response } from "express";
import sequelize from "../../../database/connection";
import generateInstituteRandomNumbers from "../../global/services/generateRandomNumber";
import IExtendedRequest from "../../global/types/types";
import { User } from "../../../database/models/userModel";

class instituteController {
    static async createInstitute(req: IExtendedRequest, res: Response, next: NextFunction) {
        const {
            instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress,
            instituteVatNumber = null,
            institutePanNumber = null
        } = req.body;

        if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            return res.status(400).json({
                message: "Provide all the required fields!!"
            });
        };

        try {
            const instituteNumber: Number = generateInstituteRandomNumbers();
            //table creation for institute
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
            //inserting institute data
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

            //storing user history table creation
            await sequelize.query(`
                CREATE TABLE IF NOT EXISTS user_history(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    userId VARCHAR(255) NOT NULL REFERENCES user(id),
                    instituteNumber VARCHAR(255) NOT NULL
                )`
            );
            //inserting data to user history table
            if (req.user) {
                await sequelize.query(
                    `INSERT INTO user_history(
                        userId,
                        instituteNumber
                    ) VALUES(?,?)`, {
                    replacements: [req.user?.id, instituteNumber]
                });
            };

            const user = await User.findByPk(req.user?.id); //finding user
            if (!user) {
                return res.status(404).json({ message: "User not found!!" })
            };
            //updating instituteNumber in user table
            user.currentInstituteNumber = String(instituteNumber);
            user.roles = "admin"
            await user?.save();
            req.instituteNumber = String(instituteNumber)

            next();
        } catch (error) {
            console.error("✗ Failed to create institute:", (error as Error).stack);
            return res.status(500).json({
                message: "Failed to create institute",
                error: (error as Error).stack
            });
        };
    };

    static async createTeacherTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        const instituteNumber = req?.instituteNumber;
        console.log("✅ teacher instituteNumber", req?.instituteNumber);

        try {
            await sequelize.query(`
               CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
                teacher_id  VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                teacherName VARCHAR(255) NOT NULL, 
                teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
                teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
                teacherExperience VARCHAR(255), 
                joinedDate DATE, 
                salary VARCHAR(100),
                teacherPhoto VARCHAR(255), 
                teacherPassword VARCHAR(255),
                courseId VARCHAR(100) REFERENCES course_${instituteNumber}(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
               )
           `);

            next();
        } catch (error) {
            console.error("✗ Failed to teacher table:", (error as Error).stack);
            return res.status(500).json({
                message: "Failed to create teacher table",
                error: (error as Error).stack
            });
        }
    };

    static async createStudentTable(req: IExtendedRequest, res: Response, next: NextFunction) {
        const instituteNumber = req.instituteNumber;
        console.log("✅ student instituteNumber", req.instituteNumber);

        await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
             id VARCHAR(55) PRIMARY KEY DEFAULT (UUID()),
            studentName VARCHAR(255) NOT NULL, 
            studentPhoneNo VARCHAR(255) NOT NULL UNIQUE, 
            studentAddress TEXT, 
            enrolledDate DATE, 
            studentImage VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
            )`);

        return res.status(200).json({ message: "institute created!!" });
    };

    // static async createCourseChapterTable(req: IExtendedRequest, res:Response, next:Next){
    //     const instituteNumber = req.instituteNumber;

    //     await sequelize.query(`
    //         CREATE TABLE IF NOT EXISTS course_table_${instituteNumber}
    //         course_id 
    //         chapterName
    //         chapterDuration
    //     `)
    // }
};



export default instituteController;