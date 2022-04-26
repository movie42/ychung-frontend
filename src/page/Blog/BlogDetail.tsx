import React, { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import { AiFillEdit } from "react-icons/ai";
import Button from "../../components/Buttons/Button";
import { MdDelete } from "react-icons/md";
import Viewer from "../../components/Viewer";
import { useFetch } from "../../utils/customhooks/useFectch";
import { useNavigate, useParams } from "react-router";
import { deleteRequest } from "../../utils/utilities/httpMethod";
import { loginState } from "../../state/Authrization";
import { useSetView } from "../../utils/customhooks/useSetView";
import { blog } from "../../state/blog.atom";

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

interface IBlogDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: any;
}

function BlogDetail({ setDetailItem, data }: IBlogDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { login } = useRecoilValue(loginState);
  const [postData, setPostData] = useRecoilState(blog);
  const countViews = useSetView(`/api/blog/${id}/count-views`, setPostData);
  const [{ response, isLoading, csrfToken }, setOption] = useFetch({
    URL: `/api/blog/${data._id}`,
  });

  const handleUpdate = () => {
    navigate(`/blog/${data._id}/update`);
  };

  const handleDelete = () => {
    setOption(deleteRequest(csrfToken));
  };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (response) {
      navigate("/blog");
    }
  }, [response]);

  return (
    <PageDetailModal setDetailItem={setDetailItem}>
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
      <Viewer paragraph={data.paragraph} />
    </PageDetailModal>
  );
}

export default BlogDetail;
