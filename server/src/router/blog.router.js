import express from "express";
import {
  blogList,
  postBlogWrite,
  postBlogUpdate,
  blogDelete,
} from "../controller/blog.controller";

const blogRouter = express.Router();

blogRouter.route("/").get(blogList);
blogRouter.route("/create").post(postBlogWrite);
blogRouter.route("/:id([0-9a-f]{24})").post(postBlogUpdate).delete(blogDelete);

export default blogRouter;
