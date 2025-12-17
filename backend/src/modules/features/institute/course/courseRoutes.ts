import express from 'express'
import CourseController from './courseController';
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import UserVerification from '../../../global/middleware/authMiddleware';

const courseRouter = express.Router();

courseRouter.route("/").post(
    UserVerification.userAuthorizationAccessVerification,
    GlobalErrorHandler.asyncErrorHandler(CourseController.createCourse),
    GlobalErrorHandler.asyncErrorHandler(CourseController.getAllCourses),
    GlobalErrorHandler.asyncErrorHandler(CourseController.getSingleCourse),
    GlobalErrorHandler.asyncErrorHandler(CourseController.deleteCourse)
)

export default courseRouter;