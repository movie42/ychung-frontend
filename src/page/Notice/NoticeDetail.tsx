import React, { useEffect } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Viewer from "../../components/Viewer";
import { useFetch } from "../../utils/customhooks/useFectch";
import { useNavigate } from "react-router-dom";
import { deleteRequest } from "../../utils/utilities/httpMethod";

const ButtonContainer = styled.div`
  button {
    background-color: unset;
    border: 0;
    svg {
      font-size: 4rem;
      color: ${(props) => props.theme.grayBackgroundColor};
    }
    &:hover {
      svg {
        color: ${(props) => props.theme.basicColor};
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
  const [{ response, isLoading, csrfToken }, setOption] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/notice/${data._id}`,
  });

  const handleUpdate = () => {
    navigate(`/notice/${data._id}/update`);
  };

  const handleDelete = () => {
    setOption(deleteRequest(csrfToken));
  };

  useEffect(() => {
    if (response) {
      navigate("/notice");
    }
  }, [response]);

  return (
    <PageDetailModal setDetailItem={setDetailItem}>
      <>
        <PageDetailModalHeader {...data}>
          <ButtonContainer>
            <Button buttonType="icon" onClick={handleUpdate}>
              <AiFillEdit />
            </Button>
            <Button buttonType="icon" onClick={handleDelete}>
              <MdDelete />
            </Button>
          </ButtonContainer>
        </PageDetailModalHeader>
        <Viewer paragraph={data.paragraph} />
      </>
    </PageDetailModal>
  );
}

export default NoticeDetail;
