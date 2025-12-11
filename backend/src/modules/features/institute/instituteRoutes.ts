import express from 'express'
import {createInstitute} from './instituteController'

const instituteRouter = express.Router();

console.log("✅ step 3: CREATED INSTITUTE ROUTER STARTED")
instituteRouter.route("/").post(createInstitute);

export default instituteRouter;