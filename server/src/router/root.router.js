import express from "express";
import {
  postJoin,
  logout,
  search,
  authCSRFToken,
  login,
} from "../controller/root.controller";

const rootRouter = express.Router();

rootRouter.route("/join").post(postJoin);
rootRouter.route("/login").post(login);
rootRouter.route("/logout").get(logout);
rootRouter.route("/csrf-token").get(authCSRFToken);
rootRouter.route("/search").get(search);

export default rootRouter;
