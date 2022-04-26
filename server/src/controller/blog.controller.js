import jwt from "jsonwebtoken";
import Blog from "../model/Blog.model";
import User from "../model/User.model";

// list
export const blogList = async (req, res) => {
  try {
    const data = (
      await Blog.find().populate("creator").sort({ updateAt: "desc" })
    ).reverse();
    return res.status(200).json({ data });
  } catch (error) {
    console.log(e);
    return res.status(403).json({
      message: "블로그 게시물을 찾을 수가 없습니다.",
    });
  }
};

export const postBlogWrite = async (req, res) => {
  const {
    body: { title, paragraph },
    cookies: { token },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(token, secret);

    const data = await Blog.create({
      title,
      paragraph,
      creator: user._id,
    });
    const findUser = await User.findById(user._id);

    findUser.blog.push(data._id);

    await findUser.save();

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    const errorMessage =
      "블로그를 쓰는 중에 오류가 발생했습니다. 지속적으로 문제가 발생할 시에 관리자에게 문의하십시오.";
    return res.status(400).render("blog/blogUpload", {
      pageTitle: "블로그",
      errorMessage,
    });
  }
};

export const postBlogUpdate = async (req, res) => {
  const {
    body: { title, paragraph },
    params: { id },
    cookies: { token },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(token, secret);

    const data = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        title,
        paragraph,
      },
    );
    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).render("404", {
      pageTitle: "수정할 수 없습니다.",
      errorMessage: "수정하는 과정에서 알 수 없는 오류가 발생했습니다.",
    });
  }
};

export const blogDelete = async (req, res) => {
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
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ data: "delete" });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "삭제를 할수 없습니다." });
  }
};

export const countPostViews = async (req, res) => {
  const {
    params: { id },
    body: { views },
  } = req;

  try {
    const blogViews = await Blog.findById({ _id: id });
    blogViews.views = blogViews.views + views;
    await blogViews.save();
    return res.status(200).json({ views: blogViews.views });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "조회수를 더 할 수 없습니다." });
  }
};
