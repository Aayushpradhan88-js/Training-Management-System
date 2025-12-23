import express from "express"
import GlobalErrorHandler from "../../../global/services/asyncErrorHandler";
import CategoryController from "./categoryController";
import UserVerification from "../../../global/middleware/authMiddleware";
const categoryRoute = express.Router()

categoryRoute.route("/category")
    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.getAllCategory));

categoryRoute.route("/create-category")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.createCategory));

categoryRoute.route("/:id")
    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.updateSingleCategory))

    .get(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.getSingleCategory))

    .post(UserVerification.userAuthorizationAccessVerification,
        GlobalErrorHandler.asyncErrorHandler(CategoryController.deleteSingleCategory))

export default categoryRoute;