import express from "express";
import {
  getJoin,
  postJoin,
  logout,
  search,
  getVote,
  postVote,
  login
} from "../controller/root.controller";
import { onlyPrivate, onlyPublic } from "../middleWare";

const rootRouter = express.Router();

// login

rootRouter.route("/login").post(login);

rootRouter.route("/getCSRFToken").get((req, res) => {
  return res.status(200).json({ CSRFToken: req.csrfToken() });
});

// join
rootRouter.route("/join").get(getJoin).post(postJoin);

// logout
rootRouter.route("/logout").get(logout);

// search
rootRouter.route("/search").get(search);

//vote
rootRouter.route("/vote").get(getVote).post(postVote);

export default rootRouter;
