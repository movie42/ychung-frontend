export const godpeopleDeepLink = (
  word: string,
  chapter: number,
  verse: number
) => {
  const url = "gpbible://link";

  const BIBLE_DATA_SET: { [key: string]: string } = {
    gen: "01",
    exo: "02",
    lev: "03",
    num: "04",
    deu: "05",
    jos: "06",
    jdg: "07",
    rut: "08",
    "1sa": "09",
    "2sa": "10",
    "1ki": "11",
    "2ki": "12",
    "1ch": "13",
    "2ch": "14",
    ezr: "15",
    neh: "16",
    est: "17",
    job: "18",
    psa: "19",
    pro: "20",
    ecc: "21",
    sng: "22",
    isa: "23",
    jer: "24",
    lam: "25",
    ezk: "26",
    dan: "27",
    hos: "28",
    jol: "29",
    amo: "30",
    oba: "31",
    jnh: "32",
    mic: "33",
    nam: "34",
    hab: "35",
    zep: "36",
    hag: "37",
    zec: "38",
    mal: "39",
    mat: "40",
    mrk: "41",
    luk: "42",
    jhn: "43",
    act: "44",
    rom: "45",
    "1co": "46",
    "2co": "47",
    gal: "48",
    eph: "49",
    php: "50",
    col: "51",
    "1th": "52",
    "2th": "53",
    "1ti": "54",
    "2ti": "55",
    tit: "56",
    phm: "57",
    heb: "58",
    jas: "59",
    "1pe": "60",
    "2pe": "61",
    "1jn": "62",
    "2jn": "63",
    "3jn": "64",
    jud: "65",
    rev: "66",
  };

  const chapterParser = (chapter: number): string => {
    if (chapter < 10) {
      return `00${chapter}`;
    }
    if (chapter < 100) {
      return `0${chapter}`;
    }
    return `${chapter}`;
  };

  const verseParser = (verse: number): string => {
    if (verse < 10) {
      return `00${verse}`;
    }

    if (verse < 100) {
      return `0${verse}`;
    }

    return `${verse}`;
  };

  const linkApp = `${url}?ujj=${BIBLE_DATA_SET[word]}${chapterParser(
    chapter
  )}${verseParser(verse)}/`;

  window.location.href = linkApp;
};

export const createBibleLink = (
  word: string,
  chapter: number,
  verse: number
) => {
  return `https://www.bskorea.or.kr/bible/korbibReadpage.php?version=SAENEW&book=${word}&chap=${chapter}&sec=${verse}`;
};

export const checkGodpeopleBibleInstall = (
  word: string,
  chapter: number,
  verse: number
) => {
  const clearTimers = () => {
    clearInterval(check);
    clearTimeout(timer);
  };

  const isHideWeb = () => {
    if (document.hidden) {
      clearTimers();
    }
  };

  const check = setInterval(isHideWeb, 200);

  const timer = setTimeout(() => {
    redirectStore();
  }, 500);

  const redirectStore = () => {
    const userAgent = navigator.userAgent.toLocaleLowerCase();

    const isMobile = () => {
      return (
        userAgent.indexOf("iphone") ||
        userAgent.indexOf("ipad") ||
        userAgent.indexOf("android")
      );
    };

    if (isMobile() > -1) {
      if (window.confirm("갓피플 성경을 설치 하실래요?")) {
        window.location.href =
          userAgent.indexOf("android") > -1
            ? "https://play.google.com/store/apps/details?id=com.godpeople.GPBIBLE"
            : "https://apps.apple.com/kr/app/갓피플성경/id511852665";
        return;
      }
    }

    if (window.confirm("웹으로 성경을 보여드려요?")) {
      window.location.href = createBibleLink(word, chapter, verse);
    }

    clearTimers();
  };
};
