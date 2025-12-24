import express from 'express'
import CourseController from './courseController';
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';
import UserVerification from '../../../global/middleware/authMiddleware';
import upload from '../../../global/middleware/cloudinaryMiddleware';

const courseRouter = express.Router();

// console.log("✅Router triggered")
courseRouter.route("/")
    .post(UserVerification.userAuthorizationAccessVerification,
        upload.single('courseThumbnail'), //upload image
        GlobalErrorHandler.asyncErrorHandler(CourseController.createCourse))

    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getAllCourses))

courseRouter.route("/:id")
    .delete(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.deleteSingleCourse))
        
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CourseController.getSingleCourse))

export default courseRouter;