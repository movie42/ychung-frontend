import express from "express";
import {
  worshipWeeklylist,
  createWorshipWeekly,
  updateWorshipWeekly,
  deleteWorshipWeekly,
} from "../controller/worship.controller";

const worshipRouter = express.Router();

worshipRouter.route("/").get(worshipWeeklylist);
worshipRouter.route("/create").post(createWorshipWeekly);
worshipRouter
  .route("/:id([0-9a-f]{24})")
  .post(updateWorshipWeekly)
  .delete(deleteWorshipWeekly);

export default worshipRouter;
