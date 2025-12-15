import express from 'express'
import userVerification from '../../global/middleware/authMiddleware';
import instituteController from './instituteController';

const instituteRouter = express.Router();

instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,//middleware implemented before institute creation
    instituteController.createInstitute,
    instituteController.createTeacherTable,
    instituteController.createStudentTable
);

export default instituteRouter;