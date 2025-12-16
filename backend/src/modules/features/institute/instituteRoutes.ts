import express from 'express'
import userVerification from '../../global/middleware/authMiddleware';
import instituteController from './instituteController';
import GlobalErrorHandler from '../../global/services/asyncErrorHandler';

const instituteRouter = express.Router();

instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    instituteController.createInstitute,
    instituteController.createTeacherTable,
    instituteController.createStudentTable,
    GlobalErrorHandler.asyncErrorHandler(instituteController.createCourseChapterTable)
);

export default instituteRouter;