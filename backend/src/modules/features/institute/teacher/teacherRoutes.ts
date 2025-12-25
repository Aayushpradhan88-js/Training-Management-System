import express from 'express'
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import TeacherController from './teacherController';
import UserVerification from '../../../global/middleware/authMiddleware';
import upload from '../../../global/middleware/cloudinaryMiddleware';
const teacherRouter = express.Router();

teacherRouter.route("/create").post(
    UserVerification.userAuthorizationAccessVerification,
    upload.single('teacher photo'),
    GlobalErrorHandler.asyncErrorHandler(TeacherController.createTeacher))

export default teacherRouter;