import {Router} from 'express'
import {createInstitute} from './instituteController'
const instituteRouter = Router();

instituteRouter.route("/").post(createInstitute);

export default instituteRouter;