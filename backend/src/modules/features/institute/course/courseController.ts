import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CourseController {
    static async createCourse(req: IExtendedRequest, res: Response) {
        const {
            courseName,
            courseDescription,
            coursePrice,
            courseDuration,
            courseLevel,
            categoryId
        } = req.body;

        if (!courseName || !courseDescription || !coursePrice || !courseDuration || !courseLevel || !categoryId) {
            return res.status(400).json({
                message: 'fill all the required fields'
            });
        };

        const instituteNumber = req?.instituteNumber
        await sequelize.query(`
            INSERT INTO IF EXISTS course_${instituteNumber}(
                courseName,
                courseDescription,
                coursePrice,
                courseDuration,
                courseLevel,
                courseThumbnail,
                categoryId
            ) VALUES(?,?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [courseName, courseDescription, coursePrice, courseDuration, courseLevel, categoryId]
        });

        return res.status(200).json({message: "course created successfully"});
    };
};