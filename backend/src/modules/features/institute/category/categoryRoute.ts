import express from "express"
const categoryRoute = express.Router()

categoryRoute.route("/").get();
categoryRoute.route("/:id").post();

export default categoryRoute;