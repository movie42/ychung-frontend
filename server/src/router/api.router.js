import express from "express";
import {
  registerComments,
  deleteComment,
  getDB,
  getParagraph,
  postEditorImage,
  patchNoticeToWeekly,
} from "../controller/api.controller";
import {
  onlyPrivate,
  preUrl,
  editorImage,
  isAuth,
  authorityHandler,
} from "../middleWare";

const api = express.Router();

api
  .route("/:id([0-9a-f]{24})/comments")
  .post(registerComments)
  .delete(deleteComment);

api
  .route("/notice/is-weekly")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator"),
  )
  .patch(patchNoticeToWeekly);

api.route("/post-image").post(editorImage, postEditorImage);

api.route("/checked-db/:name=:value").get(getDB);

export default api;
