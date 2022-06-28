import React, { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Viewer from "../../components/Viewer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loginState } from "../../state/Authrization";
import { INoticeInterface, notice } from "../../state/notice.atom";
import { useSetView } from "../../utils/customhooks/useSetView";
import useDelete from "../../utils/customhooks/useDelete";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal";
import SEO from "../../components/SEO/SEO";
import { previewParagraph } from "../../utils/utilities/previewParagraph";

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
  data?: INoticeInterface;
}

function NoticeDetail({ setDetailItem, data }: INoticeDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLogin } = useRecoilValue(loginState);
  const setNoticeData = useSetRecoilState(notice);
  const countViews = useSetView(`/api/notice/${id}/count-views`, setNoticeData);

  const { mutate, isConfirmModal, setIsConfirmModal, isDelete, setIsDelete } =
    useDelete({
      url: `/api/notice/${data?._id}`,
      queryKey: "notice",
    });

  const handleUpdate = () => {
    navigate(`/notice/${data?._id}/update`);
  };

  const handleDelete = () => {
    setIsConfirmModal(true);
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
    if (isDelete) {
      mutate(undefined, {
        onSuccess: () => {
          setIsConfirmModal(false);
          navigate("/notice");
        },
      });
    }
  }, [isDelete]);

  return (
    <>
      <SEO
        title={data?.title}
        description={data?.paragraph && previewParagraph(data?.paragraph)}
        keywords={`공지, 공지사항, 양청 공지사항, 양정교회 청년부 공지사항, ${data?.title}`}
      />
      {isConfirmModal && (
        <ConfirmDeleteModal
          setIsConfirmModal={setIsConfirmModal}
          setIsDelete={setIsDelete}
        />
      )}
      <PageDetailModal setDetailItem={setDetailItem}>
        <>
          <PageDetailModalHeader {...data}>
            {isLogin && (
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
          {data?.startDate && (
            <a
              download="event.ics"
              href={`${saveICS(
                data?.startDate,
                data?.endDate,
                data?.summary
              )}`}>
              일정을 달력에 저장하기
            </a>
          )}
          <Viewer paragraph={data?.paragraph} />
        </>
      </PageDetailModal>
    </>
  );
}

export default NoticeDetail;
