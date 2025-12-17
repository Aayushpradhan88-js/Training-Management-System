import { Response } from "express";
import IExtendedRequest from "../../../global/types/types";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CourseController {
    //create course
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

        if (!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel) {
            return res.status(400).json({
                errorMessage: 'fill all the required fields'
            });
        };

        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if(!currentInstituteNumber || currentInstituteNumber.trim().length === 0){
            return res.status(400).json({errorMessage: "Invalid institute number"});
        };
        // console.log("✅ Full req.user:", req.user);
        // console.log("✅ Type of req.user:", typeof req.user);
        // console.log("✅ currentInstituteNumber:", req.user?.currentInstituteNumber);
        // const [instertId, affectedRow] = 
        await sequelize.query(`
            INSERT INTO course_${currentInstituteNumber}(
                coursePrice, 
                courseName,
                courseDescription, 
                courseDuration, 
                courseLevel, 
                courseThumbnail
            ) VALUES(?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail,
                // categoryId - in qyery add at future
            ]
        });
        // console.log({ instertId, affectedRow });
        return res.status(200).json({ message: "course created successfully" });
    };

    //all course
    static async getAllCourses(req: IExtendedRequest, res: Response){
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if(!currentInstituteNumber || currentInstituteNumber.trim().length === 0){
            return res.status(400).json({errorMessage: "Invalid institute number"});
        };
        await sequelize.query(`SELECT * FROM course_${currentInstituteNumber}`);

    }

    //single course
    static async getSingleCourse(req: IExtendedRequest, res: Response){
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if(!currentInstituteNumber || currentInstituteNumber.trim().length === 0){
            return res.status(400).json({errorMessage: "Invalid institute number"});
        };
        await sequelize.query(`SELECT * FROM course_${currentInstituteNumber}`);

    }

    //delete course
    static async deleteCourse(req: IExtendedRequest, res: Response){
        const currentInstituteNumber = req.user?.currentInstituteNumber;
        if(!currentInstituteNumber || currentInstituteNumber.trim().length === 0){
            return res.status(400).json({errorMessage: "Invalid institute number"});
        };
        await sequelize.query(`SELECT * FROM course_${currentInstituteNumber}`);

    }
};

export default CourseController;