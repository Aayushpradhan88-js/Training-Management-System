import { Request, Response } from "express";


const createInstitute = (req:Request, res:Response) => {
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    const {instituteVatNumber} = req.body || null;
    const {institutePanNumber} = req.body || null;

    if(!instituteName, !instituteEmail, !institutePhoneNumber, !instituteAddress){
        return res.status(400).json({
            message: "Provide all the required fields!!"
        })
    }

}