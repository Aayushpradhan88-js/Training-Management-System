import express from 'express'
import CourseController from './courseController';
import GlobalErrorHandler from '../../../global/services/asyncErrorHandler';

const courseRouter = express.Router();

courseRouter.route("/").post(GlobalErrorHandler.asyncErrorHandler(CourseController.createCourse))