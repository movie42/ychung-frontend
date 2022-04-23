import Notice from "../model/Notice.model";
import jwt from "jsonwebtoken";

export const getNoticeData = async (req, res) => {
  try {
    const data = (await Notice.find().populate("creator")).reverse();
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message:
        "데이터를 불러올 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

export const postNewNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, paragraph },
    cookies: { token },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(token, secret);

    if (!user) {
      return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    }
    const data = await Notice.create({
      title,
      isWeekly,
      paragraph,
      creator: user._id,
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e });
  }
};

export const patchNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, paragraph },
    params: { id },
    cookies: { token },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(token, secret);

    if (!user) {
      return res.status(400).json({ data: "error" });
    }

    const data = await Notice.findByIdAndUpdate(
      { _id: id },
      {
        title,
        isWeekly,
        paragraph,
      },
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 수정할 수 없습니다.",
      errorMessage:
        "광고를 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

export const deleteNotice = async (req, res) => {
  const {
    cookies: { token },
    params: { id },
  } = req;
  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(token, secret);
    if (!user) {
      return res.status(400).json({ data: "error" });
    }
    await Notice.findByIdAndDelete(id);
    res.status(200).json({ data: "success" });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 수정할 수 없습니다.",
      errorMessage:
        "광고를 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};