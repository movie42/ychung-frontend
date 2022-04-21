import express from "express";
import {
  blogList,
  postBlogWrite,
  blogDetail,
  postBlogUpdate,
  blogDelete,
} from "../controller/blog.controller";
import {
  onlyPrivate,
  preUrl,
  view,
  authorityHandler,
  isAuth,
} from "../middleWare";

const blogRouter = express.Router();

// List
blogRouter.route("/").get(blogList);

// Create
blogRouter.route("/create").post(postBlogWrite);

// Read
// blogRouter.route("/:id([0-9a-f]{24})").all(view).get(blogDetail);

// Update
blogRouter.route("/:id([0-9a-f]{24})").post(postBlogUpdate).delete(blogDelete);

export default blogRouter;
