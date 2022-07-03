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
    body: { title, startDate, endDate, summary, isWeekly, paragraph },
    cookies: { accessToken },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    if (!user) {
      return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    }
    const data = await Notice.create({
      title,
      startDate,
      endDate,
      summary,
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
    body: { title, isWeekly, paragraph, startDate, endDate, summary },
    params: { id },
    cookies: { accessToken },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    if (!user) {
      return res.status(400).json({ data: "error" });
    }

    const data = await Notice.findByIdAndUpdate(
      { _id: id },
      {
        title,
        isWeekly,
        startDate,
        endDate,
        summary,
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
    cookies: { accessToken },
    params: { id },
  } = req;
  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);
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

export const countNoticeViews = async (req, res) => {
  const {
    params: { id },
    body: { views },
  } = req;

  try {
    const noticeViews = await Notice.findById({ _id: id });
    noticeViews.views = noticeViews.views + views;
    await noticeViews.save();
    return res.status(200).json({ views: noticeViews.views });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "조회수를 더 할 수 없습니다." });
  }
};
