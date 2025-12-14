import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";
import { User } from "../../../database/models/userModel";

interface IExtendedRequest extends Request {
    user?: {
        username: string,
        email: string
    }
};

class userVerification {
    static userAuthorizationAccessVerification(req: IExtendedRequest, res: Response, next: NextFunction) {
        // console.log("✅ step 14: Token triggered");
        const token = req.headers.authorization;

        // console.log("✅ step 15: Token validation completed", token);
        // console.log("✅ step 16: secret token", JWT_SECRET);
        jwt.verify((token as string), JWT_SECRET, async (error, decoded: any) => {
            // console.log("success", decoded);
            // console.log("error", error);
            if (error) {
                // console.error(error.stack)
                return res.status(403).json({ message: "Invalid token" })
            };

            const userData = await User.findByPk(decoded.id);
            if(!userData) {
                return res.status(401).json({message: "Invalid user"})
            };
            
            req.user = userData
            console.log("userData", userData);
            next();
        });
    };
};

export default userVerification;