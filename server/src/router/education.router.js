import express from "express";
import {
  getEducationGroups,
  postEducationGroups,
  updateEducationGroups,
  deleteEducationGroups,
  getEducationGroup,
  postEducationGroup,
  updateEducationGroup,
  deleteEducationGroup,
  getEducationPeople,
  postEducationPeople,
  updateEducationPeople,
  deleteEducationPeople,
  getEducationDetailGroups,
} from "../controller/education.controller";

const educationRouter = express.Router();

educationRouter
  .route("/groups")
  .get(getEducationGroups)
  .post(postEducationGroups);

educationRouter
  .route("/groups/:id([0-9a-f]{24})")
  .get(getEducationDetailGroups)
  .patch(updateEducationGroups)
  .post(updateEducationGroups)
  .delete(deleteEducationGroups);

educationRouter.route("/group").post(postEducationGroup);

educationRouter
  .route("/group/:id([0-9a-f]{24})")
  .post(updateEducationGroup)
  .delete(deleteEducationGroup);

educationRouter
  .route("/people")
  .get(getEducationPeople)
  .post(postEducationPeople);

educationRouter
  .route("/people/:id([0-9a-f]{24})")
  .post(updateEducationPeople)
  .delete(deleteEducationPeople);

export default educationRouter;
