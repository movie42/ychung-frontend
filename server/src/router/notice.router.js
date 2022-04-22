import express from "express";
import {
  getNoticeData,
  postNewNoticeData,
  patchNoticeData,
  deleteNotice,
} from "../controller/notice.controller";

const noticeRouter = express.Router();

noticeRouter.route("/").get(getNoticeData);
noticeRouter.route("/create").post(postNewNoticeData);
noticeRouter
  .route("/:id([0-9a-f]{24})")
  .post(patchNoticeData)
  .delete(deleteNotice);

export default noticeRouter;
