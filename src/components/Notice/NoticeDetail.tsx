import React from "react";
import { Viewer } from "@toast-ui/react-editor";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { calculateDate } from "../../customhooks/utiles";

const Wrapper = styled.div`
  .noticeInfo {
    display: flex;
    flex-direction: column;
  }
`;

function NoticeDetail() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(
    ["noticeDetail", id],
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notice/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Wrapper>
      <h1>{data?.title}</h1>
      <div className="noticeInfo">
        <span>조회수 : {data?.views}</span>
        <span>글쓴이 : {data?.creator.userName}</span>
        <span>날짜 : {calculateDate(data?.createdAt)}</span>
      </div>
      <Viewer
        initialValue={data?.paragraph}
        customHTMLRenderer={{
          htmlBlock: {
            iframe: (node) => [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs,
              },
              { type: "html", content: `${node.childrenHTML}` },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true,
              },
            ],
          },
        }}
      />
    </Wrapper>
  );
}

export default NoticeDetail;
