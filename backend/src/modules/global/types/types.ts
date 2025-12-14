import { Request } from "express";

interface IExtendedRequest extends Request {
    user?: {
        id: string
        username: string,
        email: string,
        password: string,
        roles: string
    }
}

export default IExtendedRequest;