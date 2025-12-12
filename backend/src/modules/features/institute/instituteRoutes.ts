import express from 'express'
import { createInstitute } from './instituteController'
import userVerification from '../../global/middleware/authMiddleware';

const instituteRouter = express.Router();

console.log("✅ step 3: CREATED INSTITUTE ROUTER STARTED")
instituteRouter.route("/").post(userVerification.userAuthorizationAccessVerification, createInstitute);

export default instituteRouter;