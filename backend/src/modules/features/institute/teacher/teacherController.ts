import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPasswordService from "../../../global/services/generateRandomPassword";

class TeacherController {
    static async createTeacher(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber?.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const { teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, courseId } = req.body;
        if (!teacherName || !teacherEmail || !teacherPassword || !teacherPhoneNumber || !teacherExperience || !joinedDate || !salary || !courseId) {
            return res.status(400).json({ errorMessage: "fill all the fields" });
        };

        const passwordData = generateRandomPasswordService.genereateHashPassword(teacherName);
        if(!passwordData){
            return res.status(500).json({ errorMessage: "password hashing failed" });
        };

        const teacherPhoto: string = req.file? req.file.path : "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740&q=80"

        const data = await sequelize.query(`
                INSERT TO  teacher_${currentInstituteNumber}(
                    teacherName,
                    teacherEmail,
                    teacherPassword,
                    teacherPhoneNumber,
                    teacherExperience,
                    joinedDate,
                    salary,
                    courseId
                ) VALUES(?,?,?,?,?,?,?,?,?)
            `, {
            type: QueryTypes.INSERT,
            replacements: [teacherName, teacherEmail, (await passwordData).hashPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherPhoto, courseId]
        });

        return res.status(200).json({
            datas: data,
            success: true,
            message:"teacher created successfully"
        });
    };
};

export default TeacherController;