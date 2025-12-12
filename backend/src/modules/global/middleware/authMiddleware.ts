import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";

class userVerification{
    static userAuthorizationAccessVerification(req:Request, res:Response, next:NextFunction) {
        console.log("✅ step 14: Token triggered");
        const token= req.headers.authorization;
        console.log("✅ step 18: Token validation completed", token);
        const isValidToken = jwt.verify(( token as string), JWT_SECRET, (success, error) => {
            if(success) {
                console.log("✅ step 15: Token validation completed");
            } else {
                console.error("✅ step 16: Invalid token", (error as string));
            }
        });

        console.log("✅ step 17: Getting decoded token", isValidToken);

        // const user = isValidToken.user;
        // req.user = user;

        next()
    }
};

export default userVerification;