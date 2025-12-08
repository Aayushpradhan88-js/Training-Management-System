import { Request, Response } from 'express'
import { User } from '../../../database/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET,JWT_EXPIRY } from '../../../config/env';

//Register

class AuthController {
    //register
    static async registerUser(req: Request, res: Response) {
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

        return res.status(200).json({
            message: "user successfully registered",
            datas: data
        })
    }

    //login 
    static async loginUser(req: Request, res: Response) {
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

        const user = await User.findOne({ where: { email } });
        // console.log("userdata", data[0]?.password);
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        if(user.password){
             return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isComparedPassword = await bcrypt.compare(password, user.password);
        if (!isComparedPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET, {JWT_EXPIRY})

        // const generateToken = jwt.sign({})
    }
};



export default AuthController;