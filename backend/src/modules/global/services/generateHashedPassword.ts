import { Response } from "express";
import IExtendedRequest from "../types/types";
import * as bcrypt from 'bcrypt'

class generateHashedPasswordService{
    static async genereateHashPassword(teacherName:string){
        const randomPassword = Math.floor(10000 + Math.random() * 30000)
        const hashedPassword = await bcrypt.hash(`${randomPassword} ${teacherName}`, 12);
        const e = {
            hashPassword: ,
            plainPassword: `${randomPassword} ${teacherName}`
        }


    }
}