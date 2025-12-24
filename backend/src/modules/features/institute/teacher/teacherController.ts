import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { QueryTypes } from "sequelize";

class TeacherController {
    static async createTeacher(req: IExtendedRequest, res: Response) {
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if (!currentInstituteNumber || currentInstituteNumber.trim().length === 0) {
            return res.status(400).json({ errorMessage: "Invalid institute number" });
        };

        const { teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherPhoto, courseId } = req.body;
        if (!teacherName || !teacherEmail || !teacherPassword || !teacherPhoneNumber || !teacherExperience || !joinedDate || !salary || !teacherPhoto || !courseId) {
            return res.status(400).json({ errorMessage: "fill all the fields" });
        }

        

        await sequelize.query(`
                INSERT TO  teacher_${currentInstituteNumber}(
                    teacherName,
                    teacherEmail,
                    teacherPassword,
                    teacherPhoneNumber,
                    teacherExperience,
                    joinedDate,
                    salary,
                    teacherPhoto,
                    courseId
                ) VALUES(?,?,?,?,?,?,?,?,?)
            `, {
            type: QueryTypes.INSERT,
            replacements: [teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherExperience, joinedDate, salary, teacherPhoto, courseId]
        });


    };
};

export default TeacherController;