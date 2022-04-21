import Notice from "../model/Notice.model";
import jwt from "jsonwebtoken";

// list
export const getNoticeData = async (req, res) => {
  try {
    const data = (await Notice.find().populate("creator")).reverse();
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

// Create
export const getCreateNoticeEditor = (req, res) => {
  return res.render("notice/noticeCreate", {
    pageTitle: "광고 쓰기",
  });
};

export const postNewNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, paragraph },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const token = jwt.verify(req.cookies.token, secret);

    if (!token) {
      return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    }
    const data = await Notice.create({
      title,
      isWeekly,
      paragraph,
      creator: token._id,
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e });
  }
};

// Read
export const getNoticeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await Notice.findById(id).populate("creator");

    if (!data) {
      return res.status(404).render("root/404", {
        pageTitle: "404",
        errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오.",
      });
    }

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 찾을 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

// Update
export const getNoticeUpdateEditor = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await Notice.findById(id);

    return res.render("notice/noticeEdit", {
      pageTitle: `${data.title} 수정`,
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고 수정 페이지를 알 수 없는 이유로 표시할 수 없습니다.",
      errorMessage:
        "광고 수정 페이지를 알 수 없는 이유로 표시할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

export const patchNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, paragraph },
    params: { id },
  } = req;

  try {
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

// Delete
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
