import mongoose from "mongoose";

const groups = mongoose.Schema({
  title: { type: String, default: "untitle" },
  isPublic: { type: Boolean, default: false },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationGroup",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const group = mongoose.Schema({
  name: { type: String },
  type: { type: String },
  humanIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationPeople",
    },
  ],
});

const people = mongoose.Schema({
  name: { type: String, requreid: true },
  groupId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationGroup",
    },
  ],
  type: { type: String, requreid: true },
});

export const groupsModel = mongoose.model("EducationGroups", groups);
export const groupModel = mongoose.model("EducationGroup", group);
export const peopleModel = mongoose.model("EducationPeople", people);
