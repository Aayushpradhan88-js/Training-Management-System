import { Request, Response } from 'express'
import { User } from '../../../database/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonweb'

//Register

class AuthController {
    //register
    static async register(req: Request, res: Response) {
        if (req.body === undefined) {
            return res.status(400).json({
                message: "No data found!!"
            });
        };

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Fill all the required fields"
            })
        };

        const hashedPassword = await bcrypt.hash(password, 30);

        const data = await User.create({
            username,
            email,
            password: hashedPassword
        });
        console.log("user data", data);

        return res.status(200).json({
            message: "user successfully registered",
            datas: data
        })
    }

    //login 
    static async login(req: Request, res: Response) {
        if (req.body === undefined) {
            return res.status(400).json({
                message: "no data"
            })
        };

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required!"
            });
        };

        const data = await User.findAll({ where: { email } });
        if (!data) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        const isComparedPassword = await bcrypt.compare(password, data[0]?.password);
        if (!isComparedPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        const generateToken =
    }
};



export default AuthController;