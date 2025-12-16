import express from 'express'
import userVerification from '../../global/middleware/authMiddleware';
import instituteController from './instituteController';

const instituteRouter = express.Router();

instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    instituteController.createInstitute,
    instituteController.createTeacherTable,
    instituteController.createStudentTable,
    instituteController.createCourseChapterTable
);

export default instituteRouter;