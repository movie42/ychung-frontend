import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "../../../components/Buttons/Button";
import { loginState } from "../../../state/Authrization";
import { useFetch } from "../../../utils/customhooks/useFectch";
import { calculateDate } from "../../../utils/utilities/calculateDate";
import { deleteRequest } from "../../../utils/utilities/httpMethod";

const Wrapper = styled(motion.div)`
  h1.head-title {
    font-size: 12rem;
    word-break: keep-all;
    font-weight: 900;
    margin: 2rem 0;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

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

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

interface IWorshipHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  creator: {
    userName: string;
  };
  createdAt: string;
}

const WorshipHeader: React.FC<IWorshipHeaderProps> = ({ ...props }) => {
  const { title, createdAt, creator } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const { login } = useRecoilValue(loginState);
  const [{ response, csrfToken }, setOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/worship/${id}`,
  });
  const queryClient = useQueryClient();

  const handleUpdate = () => {
    navigate(`/worship/${id}/update`);
  };

  const handleDelete = () => {
    setOptions(deleteRequest(csrfToken));
  };

  useEffect(() => {
    console.log(response);
    if (response === "success") {
      queryClient.invalidateQueries("weeklies");
      navigate("/worship");
    }
  }, [response]);

  return (
    <Wrapper>
      <h1 className="head-title">{title}</h1>
      <UserInfoContainer>
        <ImageContainer>
          <img src="" alt="" />
        </ImageContainer>
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
        <InforContainer>
          <span>{creator.userName}</span>
          <span>{calculateDate(createdAt)}</span>
        </InforContainer>
      </UserInfoContainer>
    </Wrapper>
  );
};

export default WorshipHeader;
