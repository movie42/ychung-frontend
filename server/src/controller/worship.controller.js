import Worship from "../model/Worship.model";
import jwt from "jsonwebtoken";

const BIBLE_DATA_SET = {
  gen: "창세기",
  exo: "출애굽기",
  lev: "레위기",
  num: "민수기",
  deu: "신명기",
  jos: "여호수아기",
  jdg: "사사기",
  rut: "룻기",
  "1sa": "사무엘기상",
  "2sa": "사무엘기하",
  "1ki": "열왕기상",
  "2ki": "열왕기하",
  "1ch": "역대상",
  "2ch": "역대하",
  ezr: "에스라기",
  neh: "느헤미야기",
  est: "에스더기",
  job: "욥기",
  psa: "시편",
  pro: "잠언",
  ecc: "전도서",
  sng: "아가",
  isa: "이사야서",
  jer: "예레미야서",
  lam: "예레미야 애가",
  ezk: "에스겔서",
  dan: "다니엘서",
  hos: "호세아서",
  jol: "요엘서",
  amo: "아모스서",
  oba: "오바댜서",
  jnh: "요나서",
  mic: "미가서",
  nam: "나훔서",
  hab: "하박국서",
  zep: "스바냐서",
  hag: "학개서",
  zec: "스가랴서",
  mal: "말라기서",
  mat: "마태복음서",
  mrk: "마가복음서",
  luk: "누가복음서",
  jhn: "요한복음서",
  act: "사도행전",
  rom: "로마서",
  "1co": "고린도전서",
  "2co": "고린도후서",
  gal: "갈라디아서",
  eph: "에베소서",
  php: "빌립보서",
  col: "골로새서",
  "1th": "데살로니가전서",
  "2th": "데살로니가후서",
  "1ti": "디모데전서",
  "2ti": "디모데후서",
  tit: "디도서",
  phm: "빌레몬서",
  heb: "히브리서",
  jas: "야고보서",
  "1pe": "베드로전서",
  "2pe": "베드로후서",
  "1jn": "요한1서",
  "2jn": "요한2서",
  "3jn": "요한3서",
  jud: "유다서",
  rev: "요한계시록",
};

export const worshipWeeklylist = async (req, res) => {
  try {
    const data = (
      await Worship.find().populate("creator").sort({ updateAt: "desc" })
    ).reverse();

    if (!data) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "페이지를 찾을 수 없습니다. ",
    });
  }
};

export const createWorshipWeekly = async (req, res) => {
  const {
    body: {
      title,
      pastor,
      worshipTeam,
      word,
      chapter,
      verse,
      verse_end,
      prayer,
      advertisement,
      reader,
      benediction,
    },
    cookies: { accessToken },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    const data = await Worship.create({
      title,
      pastor,
      worshipTeam,
      word,
      chapter,
      verse,
      verse_end,
      prayer,
      advertisement,
      reader,
      benediction,
      creator: user._id,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "주보를 작성할 수 없습니다." });
  }
};

export const updateWorshipWeekly = async (req, res) => {
  const {
    params: { id },
    body: {
      title,
      word,
      chapter,
      verse,
      verse_end,
      pastor,
      worshipTeam,
      prayer,
      advertisement,
      reader,
      benediction,
    },
    cookies: { accessToken },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    if (!user) {
      return res.status(403).json({ message: "인증되지 않은 사용자입니다." });
    }

    const data = await Worship.findByIdAndUpdate(id, {
      title,
      word,
      chapter,
      verse,
      verse_end,
      pastor,
      worshipTeam,
      prayer,
      advertisement,
      reader,
      benediction,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "주보를 수정할 수 없습니다.",
    });
  }
};

export const deleteWorshipWeekly = async (req, res) => {
  const {
    cookies: { accessToken },
    params: { id },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    if (!user) {
      return res.status(403).json({ message: "인증되지 않은 사용자입니다." });
    }

    await Worship.findByIdAndDelete(id);

    return res.status(200).json({ data: "success" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "해당 정보를 삭제하는 과정에서 알 수 없는 오류를 발견했습니다.",
    });
  }
};

export const countWeeklyViews = async (req, res) => {
  const {
    params: { id },
    body: { views },
  } = req;

  try {
    const weeklyViews = await Worship.findById({ _id: id });
    weeklyViews.views = weeklyViews.views + views;
    await weeklyViews.save();
    return res.status(200).json({ views: weeklyViews.views });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "조회수를 더 할 수 없습니다." });
  }
};
