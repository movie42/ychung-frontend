import React from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import styled from "styled-components";
import IconButton from "../../components/Buttons/IconButton";
import Viewer from "../../components/Viewer";

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
  const handleUpdate = () => {
    console.log("update");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <PageDetailModal setDetailItem={setDetailItem}>
      <>
        <PageDetailModalHeader {...data}>
          <ButtonContainer>
            <IconButton onClick={handleUpdate}>
              <AiFillEdit />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <MdDelete />
            </IconButton>
          </ButtonContainer>
        </PageDetailModalHeader>
        <Viewer paragraph={data.paragraph} />
      </>
    </PageDetailModal>
  );
}

export default NoticeDetail;
