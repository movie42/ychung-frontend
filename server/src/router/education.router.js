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

// 소그룹 전체 데이터
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

// 소그룹 개별 데이터
educationRouter
  .route("/groups/:id([0-9a-f]{24})/group")
  .get(getEducationGroup)
  .post(postEducationGroup);

educationRouter.route("/group/:id([0-9a-f]{24})").delete(deleteEducationGroup);

educationRouter.route("/group/update").patch(updateEducationGroup);

educationRouter
  .route("/group/:id([0-9a-f]{24})/people")
  .get(getEducationPeople)
  .post(postEducationPeople);

educationRouter
  .route("/people/:id([0-9a-f]{24})")
  .post(updateEducationPeople)
  .delete(deleteEducationPeople);

export default educationRouter;
