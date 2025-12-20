import { Router } from "express";
import AuthController from "./authController";
const   authRouter = Router();

authRouter.route("/register").post(AuthController.registerUser);
authRouter.route("/login").post(AuthController.loginUser);
authRouter.route("/logout").post();
authRouter.route("/forgetpassword").post();

export default authRouter;