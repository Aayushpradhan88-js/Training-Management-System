import { Router } from "express";
import AuthController from "./authController";
const   authRouter = Router();


authRouter.route("/register").post(AuthController.register);

export default authRouter;