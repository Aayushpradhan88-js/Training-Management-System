import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";
import { User } from "../../../database/models/userModel";

class userVerification {
    static userAuthorizationAccessVerification(req: Request, res: Response, next: NextFunction) {
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

            const userId= await User.findByPk(decoded.id);
            if(!userId) {
                return res.status(401).json({message: "Invalid user"})
            };
            // (req as any).user = decoded;
            next();
        });
    };
};

export default userVerification;