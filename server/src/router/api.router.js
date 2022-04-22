import express from "express";
import {
  registerComments,
  deleteComment,
  validator,
  postEditorImage,
  patchNoticeToWeekly,
} from "../controller/api.controller";
import {
  deleteNotice,
  getNoticeData,
  patchNoticeData,
  postNewNoticeData,
} from "../controller/notice.controller";
import { login, logout, postJoin, search } from "../controller/root.controller";
import { editorImage, isAuth, authorityHandler } from "../middleWare";
import blogRouter from "./blog.router";
import documentsRouter from "./documents.router";
import noticeRouter from "./notice.router";
import rootRouter from "./root.router";
import userRouter from "./user.router";
import worshipRouter from "./worship.router";

const api = express.Router();

api.route("/notice/is-weekly").post(patchNoticeToWeekly);

// image
api.route("/post-image").post(editorImage, postEditorImage);

api.route("/checked-db/:name=:value").get(validator);

api.use("/", rootRouter);
api.use("/user", userRouter);
api.use("/notice", noticeRouter);
api.use("/worship", worshipRouter);
api.use("/blog", blogRouter);
api.use("/documents", documentsRouter);

export default api;
