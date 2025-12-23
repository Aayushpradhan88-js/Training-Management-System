import { Response, response } from "express"
import IExtendedRequest from "../../../global/types/types"
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

class CategoryController {
    //create category
    static async createCategory(req: IExtendedRequest, res: Response) {
        // console.log("create category table triggered");
        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const { categoryName, categoryDescription } = req.body;
        if (!categoryName || !categoryDescription) {
            return res.status(400).json({
                message: 'fill all the required fields'
            });
        };

        await sequelize.query(`
            INSERT TO category_${instituteNumber}(
                categoryName,
                categoryDescription
            ) VALUES(?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [categoryName, categoryDescription]
        });

        return res.status(200).json({
            datas: {
                institute: instituteNumber,
                categoryName: categoryName
            },
            message: `Successfully created ${categoryName} category`
        });
    };

    //get all category
    static async getAllCategory(req: IExtendedRequest, res: Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        if (!instituteNumber || instituteNumber.trim().length === 0) {
            return res.status(400).json({
                message: 'invalid institute number'
            });
        };

        const getAllCategory = await sequelize.query(`
            SELECT * FROM category_${instituteNumber} 
        `);
        if (!getAllCategory) {
            return res.status(400).json({ errorMessage: "failed to fetch data" });
        };

        return res.status(200).json({
            datas: getAllCategory,
            message: "All category fetched successfully"
        });
    };
};