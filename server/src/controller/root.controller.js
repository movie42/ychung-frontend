import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.model";
import QT from "../model/Blog.model";
import Weekly from "../model/Worship.model";
import Notice from "../model/Notice.model";

export const authCSRFToken = (req, res) => {
  return res.status(200).json({ CSRFToken: req.csrfToken() });
};

export const login = async (req, res) => {
  const {
    body: { email, password },
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

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        authority: user.authority,
      },
      secret,
      {
        expiresIn: 24 * 60 * 60 * 1000,
        issuer: process.env.ORIGIN || "http://localhost:4000",
        subject: "access token",
      },
    );

    const refreshToken = await jwt.sign(
      {
        _id: user.id,
      },
      secret,
      {
        expiresIn: 7 * 24 * 60 * 60 * 1000,
        issuer: process.env.ORIGIN || "http://localhost:4000",
        subject: "refresh token",
      },
    );

    if (!accessToken && !refreshToken) {
      throw new Error("알 수 없는 이유로 로그인 할 수 없습니다.");
    }

    res.cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      data: {
        isLogin: true,
        _id: user._id,
        email: user.email,
        authority: user.authority,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "로그인을 할 수 없습니다." });
  }
};

export const postJoin = async (req, res) => {
  const {
    body: { email, name, userName, password, password2 },
  } = req;

  try {
    const exists = await User.exists({
      $or: [{ userName }, { email }],
    });

    if (exists) {
      return res.status(400).json({
        message: "이미 존재하는 회원입니다.",
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        message: "패스워드가 올바르지 않습니다.",
      });
    }

    await User.create({
      email,
      userName,
      name,
      password,
    });

    return res.status(200).json({ data: { success: "ok" } });
  } catch (error) {
    console.error(error);
    return res.status(400).join({ message: "알 수 없는 에러가 발생했습니다." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("_csrf");
  return res.status(200).json({ data: { logout: true } });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let data = [];
  try {
    if (keyword) {
      const qtData = await QT.find({
        title: new RegExp(keyword, "ig"),
      });
      const weeklyData = await Weekly.find({
        title: new RegExp(keyword, "ig"),
      });
      const noticeData = await Notice.find({
        title: new RegExp(keyword, "ig"),
      });
      data.push(qtData);
      data.push(weeklyData);
      data.push(noticeData);
    }
    return res.render("root/search", {
      pageTitle: keyword,
      keyword,
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).render("root/join", {
      pageTitle: "회원가입",
      errorMessage: "회원가입을 완료할 수 없습니다",
    });
  }
};
