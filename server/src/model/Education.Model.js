import mongoose from "mongoose";

const groups = mongoose.Schema({
  title: { type: String, default: "untitle" },
  isPublic: { type: Boolean, default: false },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
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
      ref: "People",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const people = mongoose.Schema({
  name: { type: String, requreid: true },
  type: { type: String, requreid: true },
  createdAt: { type: Date, default: Date.now },
});

export const groupsModel = mongoose.model("EducationGroup", groups);
export const groupModel = mongoose.model("Group", group);
export const peopleModel = mongoose.model("People", people);
