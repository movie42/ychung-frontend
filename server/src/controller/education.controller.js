import { groupsModel, groupModel, peopleModel } from "../model/Education.Model";

export const getEducationGroup = async (req, res) => {
  try {
    const groups = groupsModel.find();
    return res.status(200).json({ ...groups });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const postEducationGroup = async (req, res) => {
  const {
    body: { title, isPublic, groups },
  } = req;

  try {
    const group = await groupsModel.create({
      title,
      isPublic,
      groups,
    });

    return res.status(200).json({ group });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const updateEducationGroup = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const deleteEducationGroup = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const getEducationPeople = async (req, res) => {
  try {
    const people = await peopleModel.find();
    return res.status(200).json({ people });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const postEducationPeople = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const updateEducationPeople = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const deleteEducationPeople = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};
