export const calculateDate = (date: string) => {
  const createDate = new Date(date);

  const createDateToTime = new Date(date).getTime();
  const now = Date.now();
  const amountTimeFromNow = now - createDateToTime;
  const amountTimeForSeconds = amountTimeFromNow / 1000;

  const time = {
    minute: Math.floor((amountTimeForSeconds % 3600) / 60),
    hour: Math.floor(amountTimeForSeconds / 3600),
    day: Math.floor(amountTimeForSeconds / (3600 * 24)),
  };

  if (time.hour < 1) {
    return `${time.minute}분 전`;
  }

  if (time.day < 1) {
    return `${time.hour}시간 전`;
  }

  if (time.day > 1 && time.day <= 7) {
    return `${time.day}일 전`;
  }

  return `${createDate.getFullYear()}년 ${
    createDate.getMonth() + 1
  }월 ${createDate.getDate()}일`;
};

export const previewParagraph = (item: string) => {
  const newPreview = item
    .replace(/[#*\\[\]``]|<(.*)>|\((.*)\)/g, " ")
    .replace(/\s+/g, " ");
  return newPreview.length < 100
    ? newPreview
    : `${newPreview.slice(0, 100)}...`;
};

export const imageParser = (data: string) => {
  const image = data.match(/\!(.*)\)/g);
  if (image) {
    const [imageStrings] = Array.from(image).filter((value) =>
      value.includes("https")
    );
    const thumnail = imageStrings
      .replace(/[(,)]/g, "")
      .replace(/\!(.*)\]/g, "");
    return thumnail.includes("https") ? thumnail : null;
  }
  return null;
};

export const chapterNameTransferFromEngToKr = (data: string) => {
  const BIBLE_DATA_SET: { [key: string]: string } = {
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

  return BIBLE_DATA_SET[data];
};
