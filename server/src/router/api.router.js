import express from "express";
import {
  validator,
  postEditorImage,
  patchNoticeToWeekly,
} from "../controller/api.controller";

import { editorImage } from "../middleWare";
import blogRouter from "./blog.router";
import documentsRouter from "./documents.router";
import educationRouter from "./education.router";
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
api.use("/education", educationRouter);
api.use("/blog", blogRouter);
api.use("/documents", documentsRouter);

export default api;
