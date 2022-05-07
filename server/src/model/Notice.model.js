import mongoose from "mongoose";

const now = new Date();
const noticeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  summary: {
    type: String,
  },
  isWeekly: { type: Boolean, default: false },
  paragraph: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updateAt: { type: Date },
});

const model = mongoose.model("Notice", noticeSchema);

export default model;
