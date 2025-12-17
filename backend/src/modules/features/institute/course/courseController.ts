import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CourseController {
    static async createCourse(req: IExtendedRequest, res: Response) {
        const {
            coursePrice, 
            courseName, 
            courseDescription, 
            courseDuration, 
            courseLevel, 
            courseThumbnail,
            //  categoryId
        } = req.body;
        // console.log("✅step 1: All data from the body", courseName, courseDescription,
        //     coursePrice,
        //     courseDuration,
        //     courseLevel,
        //     // categoryId
        // )

        if (!coursePrice || !courseName || !courseDescription ||!courseDuration || !courseLevel) {
            return res.status(400).json({
                message: 'fill all the required fields'
            });
        };

        const instituteNumber = req.user?.currentInstituteNumber
        console.log("✅ Full req.user:", req.user);
        console.log("✅ Type of req.user:", typeof req.user);
        console.log("✅ currentInstituteNumber:", req.user?.currentInstituteNumber);
        const result = await sequelize.query(`
            INSERT INTO course_${instituteNumber}(
                coursePrice, courseName,courseDescription, courseDuration, courseLevel, courseThumbnail
            ) VALUES(?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail, 
                // categoryId - in qyery add at future
            ]
        });
        console.log("result",result);
        return res.status(200).json({ message: "course created successfully" });
    };
};

export default CourseController;