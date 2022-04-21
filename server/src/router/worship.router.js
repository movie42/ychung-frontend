import express from "express";
import { isAuth, authorityHandler, view } from "../middleWare";
import {
  worshipWeeklylist,
  createWorshipWeekly,
  updateWorshipWeekly,
  deleteWorshipWeekly,
} from "../controller/worship.controller";

const worshipRouter = express.Router();

// list

worshipRouter.route("/").get(worshipWeeklylist);

// create
worshipRouter.route("/create").post(createWorshipWeekly);

//update, delete
worshipRouter
  .route("/:id([0-9a-f]{24})")
  .post(updateWorshipWeekly)
  .delete(deleteWorshipWeekly);

export default worshipRouter;
