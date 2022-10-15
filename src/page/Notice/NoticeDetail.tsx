import { useEffect } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { loginState, INoticeInterface, notice } from "@/lib/state";
import { previewParagraph } from "@/lib/utils";
import { useModalContorl, useSetView } from "@/lib/hooks";

import {
  PageDetailModal,
  PageDetailModalHeader,
  Button,
  Viewer,
  ConfirmDeleteModal,
  SEO,
} from "@/components";
import { useDeleteNotice } from "./hooks";

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
  const { noticeId } = useParams();
  const { isLogin } = useRecoilValue(loginState);
  const setNoticeData = useSetRecoilState(notice);
  const countViews = useSetView(
    `/api/notice/${noticeId}/count-views`,
    setNoticeData
  );
  const { setIsConfirm, setIsModal, isConfirm, isModal } = useModalContorl();
  const { mutate: deleteNoticeMutate } = useDeleteNotice();

  const handleUpdate = () => {
    navigate(`/notice/${data?._id}/update`);
  };

  const handleDelete = () => {
    setIsModal(true);
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
    if (isConfirm && noticeId) {
      deleteNoticeMutate(
        { noticeId },
        {
          onSuccess: () => {
            setIsConfirm(false);
            navigate("/notice");
          },
        }
      );
    }
  }, [isConfirm]);

  return (
    <>
      <SEO
        title={data?.title}
        description={data?.paragraph && previewParagraph(data?.paragraph)}
        keywords={`공지, 공지사항, 양청 공지사항, 양정교회 청년부 공지사항, ${data?.title}`}
      />
      {isModal && (
        <ConfirmDeleteModal
          title="공지를 삭제하시겠습니까?"
          subtitle="삭제하면 데이터를 복구할 수 없습니다."
          setIsConfirm={setIsConfirm}
          setIsModal={setIsModal}
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
          <Viewer paragraph={data?.paragraph} />
        </>
      </PageDetailModal>
    </>
  );
}

export default NoticeDetail;
