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

export const deleteEducationGroups = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await groupsModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({ data: { success: "ok" } });
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
export const deleteEducationGroup = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await groupModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({ data: { success: "ok" } });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

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

export const postEducationPeople = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const group = await groupModel.findById(id);

    if (body._id) {
      const data = await peopleModel.findById(body._id);
      await group.humanIds.push(data._id);
      await group.save();
      return res.status(200).json({ data });
    }

    const person = await peopleModel.findOne({ name: body.name });

    if (person) {
      const message = "이미 존재하는 참가자입니다.";
      return res.status(403).send({ message });
    }

    const data = await peopleModel.create({ ...body });
    await group.humanIds.push(data._id);
    await group.save();
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const updateEducationPeople = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const data = await peopleModel.findByIdAndUpdate(
      { _id: id },
      {
        ...body,
      },
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const deleteEducationPeople = async (req, res) => {
  const {
    params: { id },
    query: { person },
  } = req;

  try {
    const data = await groupModel.findById(id);

    const newHumanIds = data.humanIds.filter(
      (value) => String(value) !== person,
    );
    data.humanIds = newHumanIds;
    await data.save();
    return res.status(200).json({ data: { success: "ok" } });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};

export const searchEducation = async (req, res) => {
  try {
    const {
      query: { group, person },
    } = req;

    if (person) {
      const data = await peopleModel.find({ name: new RegExp(person, "ig") });

      return res.status(200).json({ data });
    }
  } catch (err) {
    return res.status(400).json({ message: "오류가 발생했습니다." });
  }
};
