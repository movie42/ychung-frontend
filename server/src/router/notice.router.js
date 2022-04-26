import express from "express";
import {
  getNoticeData,
  postNewNoticeData,
  patchNoticeData,
  deleteNotice,
  countNoticeViews,
} from "../controller/notice.controller";

const noticeRouter = express.Router();

noticeRouter.route("/").get(getNoticeData);
noticeRouter.route("/create").post(postNewNoticeData);
noticeRouter
  .route("/:id([0-9a-f]{24})")
  .post(patchNoticeData)
  .delete(deleteNotice);
noticeRouter.route("/:id([0-9a-f]{24})/count-views").post(countNoticeViews);
export default noticeRouter;
