import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.model";
import QT from "../model/Blog.model";
import Weekly from "../model/Worship.model";
import Notice from "../model/Notice.model";
import Vote from "../model/Vote.model";

export const login = async (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "회원정보가 존재하지 않습니다." });
    }

    const confirm = await bcrypt.compare(password, user.password);

    if (!confirm) {
      return res
        .status(400)
        .json({ message: "비밀번호를 잘못 입력하였습니다." });
    }

    const token = await jwt.sign(
      {
        _id: user._id,
        email: user.email
      },
      secret,
      {
        expiresIn: "7d",
        issuer: process.env.ORIGIN || "http://localhost:4000",
        subject: "userInfo"
      }
    );

    if (!token) {
      throw new Error("알수없는 이유로 로그인 할 수 없습니다.");
    }

    return res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 604800
      })
      .status(200)
      .json({ data: { login: true, userId: user._id } });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "로그인을 할 수 없습니다." });
  }
};

// join
export const getJoin = (req, res) => {
  return res.render("root/join", {
    pageTitle: "회원가입"
  });
};

export const postJoin = async (req, res) => {
  console.log(req.body);
  const {
    body: { email, name, userName, password, password2 }
  } = req;

  try {
    const exists = await User.exists({
      $or: [{ userName }, { email }]
    });

    if (exists) {
      return res.status(400).json({
        type: "isExistsError"
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        type: "isNotpasswordError"
      });
    }

    await User.create({
      email,
      userName,
      name,
      password
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400).render("root/404");
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ data: { logout: true } });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let data = [];
  try {
    if (keyword) {
      const qtData = await QT.find({
        title: new RegExp(keyword, "ig")
      });
      const weeklyData = await Weekly.find({
        title: new RegExp(keyword, "ig")
      });
      const noticeData = await Notice.find({
        title: new RegExp(keyword, "ig")
      });
      data.push(qtData);
      data.push(weeklyData);
      data.push(noticeData);
    }
    return res.render("root/search", {
      pageTitle: keyword,
      keyword,
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(400).render("root/join", {
      pageTitle: "회원가입",
      errorMessage: "회원가입을 완료할 수 없습니다"
    });
  }
};

export const getVote = (req, res) => {
  return res.render("root/vote", { pageTitle: "투표" });
};

export const postVote = async (req, res) => {
  const {
    body: { voteName },
    session: {
      user: { _id }
    }
  } = req;

  try {
    const data = await Vote.create({
      voteName,
      creator: _id
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};
