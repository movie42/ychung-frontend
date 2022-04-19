import React from "react";
import styled from "styled-components";
import { SetterOrUpdater } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import { AiFillEdit } from "react-icons/ai";
import Button from "../../components/Buttons/Button";
import { MdDelete } from "react-icons/md";
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

interface IBlogDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: any;
}

function BlogDetail({ setDetailItem, data }: IBlogDetailProps) {
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

export default BlogDetail;
