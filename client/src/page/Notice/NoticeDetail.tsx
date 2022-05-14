import React, { useEffect } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Viewer from "../../components/Viewer";
import { useFetch } from "../../utils/customhooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRequest, postRequest } from "../../utils/utilities/httpMethod";
import { loginState } from "../../state/Authrization";
import { notice } from "../../state/notice.atom";
import { useFetchToken } from "../../utils/customhooks/useFetchToken";
import { useMutation } from "react-query";
import { useSetView } from "../../utils/customhooks/useSetView";

const ButtonContainer = styled.div`
  button {
    background-color: unset;
    border: 0;
    svg {
      font-size: 4rem;
      color: ${(props) => props.theme.color.gray300};
    }
    &:hover {
      svg {
        color: ${(props) => props.theme.color.primary400};
      }
    }
  }
`;

interface INoticeDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: any;
}

function NoticeDetail({ setDetailItem, data }: INoticeDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { login } = useRecoilValue(loginState);
  const [noticeData, setNoticeData] = useRecoilState(notice);
  const countViews = useSetView(`/api/notice/${id}/count-views`, setNoticeData);
  const [{ response, isLoading, csrfToken }, setOption] = useFetch({
    URL: `/api/notice/${data._id}`,
  });

  const handleUpdate = () => {
    navigate(`/notice/${data._id}/update`);
  };

  const handleDelete = () => {
    setOption(deleteRequest(csrfToken));
  };

  const convertDate = (date: string) => {
    return date.split("-").join("");
  };

  const saveICS = (start: string, end?: string, summary?: string) => {
    let icsFile = null;
    var event =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "UID:test-1\n" +
      "DTSTART;VALUE=DATE:" +
      convertDate(start) +
      "\n" +
      "DTEND;VALUE=DATE:" +
      (end && convertDate(end)) +
      "\n" +
      "SUMMARY:" +
      summary +
      "\n" +
      "DESCRIPTION:" +
      "\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    var data = new File([event], "event", { type: "text/plain" });

    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }

    icsFile = window.URL.createObjectURL(data);

    return icsFile;
  };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (response) {
      navigate("/notice");
    }
  }, [response]);

  return (
    <PageDetailModal setDetailItem={setDetailItem}>
      <>
        <PageDetailModalHeader {...data}>
          {login && (
            <ButtonContainer>
              <Button buttonType="icon" onClick={handleUpdate}>
                <AiFillEdit />
              </Button>
              <Button buttonType="icon" onClick={handleDelete}>
                <MdDelete />
              </Button>
            </ButtonContainer>
          )}
        </PageDetailModalHeader>
        {data.startDate && (
          <a
            download="event.ics"
            href={`${saveICS(data?.startDate, data?.endDate, data?.summary)}`}>
            일정을 달력에 저장하기
          </a>
        )}
        <Viewer paragraph={data.paragraph} />
      </>
    </PageDetailModal>
  );
}

export default NoticeDetail;
