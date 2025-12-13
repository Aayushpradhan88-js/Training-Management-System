import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";

class userVerification{
    static userAuthorizationAccessVerification(req:Request, res:Response, next:NextFunction) {
        console.log("✅ step 14: Token triggered");
        const token= req.headers.authorization;

        console.log("✅ step 15: Token validation completed", token);
        console.log("✅ step 16: secret token", JWT_SECRET);
        const isValidToken = jwt.verify(( token as string), JWT_SECRET, (success, error) => {
           if(error) {
            res.status(403).json({message: "Invalid token"})
           };
           console.log("✅ step 17: Token validation completed", success);
        });

        console.log("✅ step 18: Getting decoded token", isValidToken);
        next()

        // const user = isValidToken.user;
        // req.user = user;

    }
};

export default userVerification;