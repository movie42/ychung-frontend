import { groupsModel, groupModel, peopleModel } from "../model/Education.Model";

export const getEducationGroups = async (req, res) => {
  try {
    const data = await groupsModel.find();

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const getEducationDetailGroups = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await groupsModel.findById({ _id: id });
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const postEducationGroups = async (req, res) => {
  const { body } = req;

  try {
    const data = await groupsModel.create({
      ...body,
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const updateEducationGroups = async (req, res) => {
  const {
    params: { id },
    body: { title, isPublic, groups },
  } = req;

  try {
    const data = await groupsModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { title, isPublic, groups },
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const deleteEducationGroups = (req, res) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const getEducationGroup = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const { groups } = await groupsModel.findById(id);

    if (groups.length === 0) {
      return res.status(200).json({ data: [] });
    }
    const data = await groupModel.find({ _id: groups });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const postEducationGroup = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const data = await groupModel.create({ ...body });
    const groupInfo = await groupsModel.findById(id);
    await groupInfo.groups.push(data._id);
    await groupInfo.save();
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const updateEducationGroup = async (req, res) => {
  const {
    body: { _id, name, humanIds, type },
  } = req;

  try {
    const data = await groupModel.findByIdAndUpdate(
      { _id },
      { name, humanIds, type },
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};
export const deleteEducationGroup = (req, res) => {};

export const getEducationPeople = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const { humanIds: data } = await groupModel
      .findById(id)
      .populate("humanIds");

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const postEducationPeople = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const group = await groupModel.findById(id);
    const data = await peopleModel.create({ ...body });
    await group.humanIds.push(data._id);
    await group.save();
    return res.status(200).json({ data });
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