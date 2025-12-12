import { Request, Response } from "express";
import {verify} from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";

class userVerification{
    static userAuthorizationAccessVerification(req:Request, res:Response) {
        console.log("✅ step 14: Token triggered");
        const token= req.headers.authorization;
        const isValidToken = verify(( token as string), JWT_SECRET, (success, error) => {
            if(success) {
                console.log("✅ step 15: Token validation completed");
            } else {
                console.error("✅ step 16: Invalid token", (error as string));
            }
        });
    }
}