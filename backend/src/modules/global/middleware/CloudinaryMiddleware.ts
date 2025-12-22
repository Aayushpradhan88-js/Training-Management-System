import multer from 'multer'
import { cloudinary, storage } from '../services/CloudinaryService'
import { Request } from 'express'

const upload = multer({storage: storage,
    fileFilter: (req:Request, file:Express.Multer.File, cb ) => {
        const allowableFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if(allowableFileTypes.includes(file.mimetype)){
            cb(null, true);
        }else {
            cb(new Error("Only supports image only"));
        };
    },
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

export default upload;