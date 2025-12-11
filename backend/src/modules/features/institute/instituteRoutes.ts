import express from 'express'
import {createInstitute} from './instituteController'

const instituteRouter = express.Router();

console.log("✅ step 5: Institute Route Started")
instituteRouter.route("/").post(createInstitute);

export default instituteRouter;