import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

interface ISEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  imgsrc?: string;
}

const SEO = ({
  title = "양정교회 청년부",
  description = "전주시 덕진구 천마산로 40. 양정교회 청년부입니다. 담당 교역자 : 김상돈. 전화번호 : 063-251-1903. 예배 시간 : 매주 일요일(주일) 오후 2시. 예배 장소 : 3층 본당. 예배 내용 : 1부 - 찬양, 설교, 2부 - 소그룹.",
  keywords,
  imgsrc = "https://yangchung.s3.ap-northeast-2.amazonaws.com/assets/snsImage.jpg"
}: ISEOProps) => {
  const { pathname } = useLocation();
  return (
    <Helmet>
      <title>{title} | 양청</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`양정, 양정교회, 전주 양정교회, 교회, 청년부, 양정교회 청년부, 양청, 신앙, 신앙생활, 기독교, 청년, 오후 2시, 대한예수교장로회, 합동, ${keywords}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgsrc} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://y-chung.com${pathname}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgsrc} />
      <link rel="canonical" href={`https://y-chung.com${pathname}`} />
    </Helmet>
  );
};

export default SEO;
