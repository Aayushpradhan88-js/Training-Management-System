import express from 'express'
import userVerification from '../../global/middleware/authMiddleware';
import instituteController from './instituteController';

const instituteRouter = express.Router();

// console.log("✅ step 3: CREATED INSTITUTE ROUTER STARTED")
instituteRouter.route("/").post(
    userVerification.userAuthorizationAccessVerification,
    instituteController.createInstitute
);

export default instituteRouter;