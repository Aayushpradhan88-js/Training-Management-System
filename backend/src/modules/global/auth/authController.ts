import { Request, Response } from 'express'
import { User } from '../../../database/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRY } from '../../../config/env';

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

        const hashedPassword = await bcrypt.hash(password, 12);

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

        const { email, password } = req.body; //object destructuring from body
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required!"
            });
        };

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        if (!user.password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        const isComparedPassword = await bcrypt.compare(password, user.password);
        if (!isComparedPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };


        //JWT token generation
        const token = jwt.sign(
            { id: user.id }, //userid to token
            JWT_SECRET, //jwt secret
            { expiresIn: JWT_EXPIRY } //token expiration
        );

        // console.log('JWT_SECRET:', JWT_SECRET);
        // console.log('JWT_EXPIRY:', JWT_EXPIRY);
        // console.log('User ID:', user.id);

        return res.status(200).json({
            token,
            message: "User loggedin successfully!!"
        });
    };
};

export default AuthController;