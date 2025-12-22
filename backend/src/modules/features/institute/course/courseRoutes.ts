import express from 'express'
import CourseController from './courseController';
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import UserVerification from '../../../global/middleware/authMiddleware';
import upload from '../../../global/middleware/CloudinaryMiddleware';

const courseRouter = express.Router();

courseRouter.route("/")
    .post(UserVerification.userAuthorizationAccessVerification,
        upload.single('courseThumbnail'),
        GlobalErrorHandler.asyncErrorHandler(CourseController.createCourse))
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getAllCourses))


courseRouter.route("/:id")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.deleteCourse))
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getSingleCourse))


export default courseRouter;