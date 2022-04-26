import express from "express";
import {
  blogList,
  postBlogWrite,
  postBlogUpdate,
  blogDelete,
  countPostViews,
} from "../controller/blog.controller";

const blogRouter = express.Router();

blogRouter.route("/").get(blogList);
blogRouter.route("/create").post(postBlogWrite);
blogRouter.route("/:id([0-9a-f]{24})").post(postBlogUpdate).delete(blogDelete);
blogRouter.route("/:id([0-9a-f]{24})/count-views").post(countPostViews);
export default blogRouter;
