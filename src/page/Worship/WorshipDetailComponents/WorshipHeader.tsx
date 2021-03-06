import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "../../../components/Buttons/Button";
import { loginState } from "../../../state/Authrization";
import useDelete from "../../../utils/hooks/useDelete";
import { calculateDate } from "../../../utils/utilities/calculateDate";
import ConfirmDeleteModal from "../../../components/Modals/ConfirmDeleteModal";

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

const WorshipHeader: React.FC<IWorshipHeaderProps> = ({ ...props }) => {
  const { title, createdAt, creator, views } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(loginState);

  const { mutate, isConfirmModal, isDelete, setIsConfirmModal, setIsDelete } =
    useDelete({
      url: `/api/worship/${id}`,
      queryKey: "weeklies",
    });

  const handleUpdate = () => {
    navigate(`/worship/${id}/update`);
  };

  const handleDelete = () => {
    setIsConfirmModal(true);
  };

  useEffect(() => {
    if (isDelete) {
      mutate(undefined, { onSuccess: () => navigate("/worship") });
    }
  }, [isDelete]);

  return (
    <>
      {isConfirmModal && (
        <ConfirmDeleteModal
          title="????????? ?????????????????????????"
          subtitle="???????????? ???????????? ????????? ??? ????????????."
          setIsConfirmModal={setIsConfirmModal}
          setIsDelete={setIsDelete}
        />
      )}
      <Wrapper>
        <h1 className="head-title">{title}</h1>
        <UserInfoContainer>
          <ImageContainer>
            <HumanIcon />
          </ImageContainer>
          <InforContainer>
            <span>{views}</span>
            <span>{creator?.userName}</span>
            <span>{createdAt && calculateDate(createdAt)}</span>
          </InforContainer>
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
        </UserInfoContainer>
      </Wrapper>
    </>
  );
};

export default WorshipHeader;
