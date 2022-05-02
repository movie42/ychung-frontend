import express from "express";
import {
  getEducationGroup,
  postEducationGroup,
  updateEducationGroup,
  deleteEducationGroup,
  getEducationPeople,
  postEducationPeople,
  updateEducationPeople,
  deleteEducationPeople,
} from "../controller/education.controller";

const educationRouter = express.Router();

educationRouter.route("/group").get(getEducationGroup).post(postEducationGroup);
educationRouter
  .route("/group/:id")
  .post(updateEducationGroup)
  .delete(deleteEducationGroup);
educationRouter
  .route("/people")
  .get(getEducationPeople)
  .post(postEducationPeople);
educationRouter
  .route("/people/:id")
  .post(updateEducationPeople)
  .delete(deleteEducationPeople);

export default educationRouter;
