import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Button, ConfirmDeleteModal } from "@/Components";
import { loginState } from "@/lib/state";
import { calculateDate } from "@/lib/utils";
import { useModalContorl } from "@/lib/hooks";
import { useDeleteWeekly } from "../../hooks";

const Wrapper = styled(motion.div)`
  overflow-x: hidden;
  h1.head-title {
    word-spacing: -4rem;
    font-size: 12rem;
    font-weight: 900;
    margin: 2rem 0;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  z-index: -1;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.gray300};
`;

const HumanIcon = styled(HiUser)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.6rem;
  width: 4.5rem;
  height: 4.5rem;
  color: ${(props) => props.theme.color.gray100};
`;

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

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  span {
    color: ${(props) => props.theme.color.gray400};
  }
`;

interface IWorshipHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  views?: number;
  creator?: {
    userName?: string;
  };
  createdAt?: string;
}

const WeekliesHeader: React.FC<IWorshipHeaderProps> = ({ ...props }) => {
  const { weekliesId } = useParams();
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(loginState);

  const { isConfirm, setIsConfirm, isModal, setIsModal } = useModalContorl();
  const { mutate: deleteWeeklyMutate } = useDeleteWeekly();

  const handleUpdate = () => {
    navigate(`/worship/${weekliesId}/update`);
  };

  const handleDelete = () => {
    setIsModal(true);
  };

  useEffect(() => {
    if (isConfirm && weekliesId) {
      deleteWeeklyMutate({ id: weekliesId });
    }
  }, [isConfirm, weekliesId, deleteWeeklyMutate]);

  return (
    <>
      {isModal && (
        <ConfirmDeleteModal
          title="주보를 삭제하시겠습니까?"
          subtitle="삭제하면 데이터를 복구할 수 없습니다."
          setIsModal={setIsModal}
          setIsConfirm={setIsConfirm}
        />
      )}
      <Wrapper>
        <h1 className="head-title">{props?.title}</h1>
        <UserInfoContainer>
          <ImageContainer>
            <HumanIcon />
          </ImageContainer>
          <InforContainer>
            <span>{props?.views}</span>
            <span>{props?.creator?.userName}</span>
            <span>{props?.createdAt && calculateDate(props?.createdAt)}</span>
          </InforContainer>
          {isLogin && (
            <ButtonContainer>
              <Button
                buttonType="icon"
                onClick={handleUpdate}
              >
                <AiFillEdit />
              </Button>
              <Button
                buttonType="icon"
                onClick={handleDelete}
              >
                <MdDelete />
              </Button>
            </ButtonContainer>
          )}
        </UserInfoContainer>
      </Wrapper>
    </>
  );
};

export default WeekliesHeader;
