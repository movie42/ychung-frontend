import express from "express";
import {
  userDetail,
  postEditUser,
  postEditPassword,
} from "../controller/user.controller";
import { photoUpload } from "../middleWare";

const userRouter = express.Router();

userRouter.route("/").get(userDetail);
userRouter
  .route("/:id([0-9a-f]{24})/edit-profile")
  .post(photoUpload, postEditUser);
userRouter.route("/:id([0-9a-f]{24})/edit-password").post(postEditPassword);

export default userRouter;
