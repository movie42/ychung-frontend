import express from "express";
import {
  getNoticeData,
  postNewNoticeData,
  patchNoticeData,
  deleteNotice,
} from "../controller/notice.controller";
import { isAuth, authorityHandler, view, preUrl } from "../middleWare";

const noticeRouter = express.Router();

// list
noticeRouter.route("/").get(getNoticeData);

// Create
noticeRouter.route("/create").post(postNewNoticeData);

// read, update
noticeRouter
  .route("/:id([0-9a-f]{24})")
  .post(patchNoticeData)
  .delete(deleteNotice);

// delete

// update
noticeRouter.route("/:id([0-9a-f]{24})").patch(patchNoticeData);

export default noticeRouter;
