import React, { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import PageDetailModal from "../../components/Modals/PageDetailModal";
import PageDetailModalHeader from "../../components/Modals/PageDetailModalHeader";
import { AiFillEdit } from "react-icons/ai";
import Button from "../../components/Buttons/Button";
import { MdDelete } from "react-icons/md";
import Viewer from "../../components/Viewer";
import { useLocation, useNavigate, useParams } from "react-router";
import { loginState } from "../../state/Authrization";
import { useSetView } from "../../utils/customhooks/useSetView";
import { blog, IBlogItems } from "../../state/blog.atom";
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

interface IBlogDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: IBlogItems;
}

function BlogDetail({ setDetailItem, data }: IBlogDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLogin } = useRecoilValue(loginState);
  const setPostData = useSetRecoilState(blog);
  const countViews = useSetView(`/api/blog/${id}/count-views`, setPostData);

  const { mutate, isConfirmModal, isDelete, setIsConfirmModal, setIsDelete } =
    useDelete({
      url: `/api/blog/${data?._id}`,
      queryKey: "posts",
    });

  const handleUpdate = () => {
    navigate(`/blog/${data?._id}/update`);
  };

  const handleDelete = () => {
    setIsConfirmModal(true);
  };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (isDelete) {
      mutate(undefined, { onSuccess: () => navigate("/blog") });
    }
  }, [isDelete]);

  return (
    <>
      <SEO
        title={data?.title}
        description={data?.paragraph && previewParagraph(data?.paragraph)}
        keywords={`블로그, 양정교회 청년부 블로그, 양청 블로그, ${data?.title}`}
      />
      {isConfirmModal && (
        <ConfirmDeleteModal
          setIsConfirmModal={setIsConfirmModal}
          setIsDelete={setIsDelete}
        />
      )}
      <PageDetailModal setDetailItem={setDetailItem}>
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
      </PageDetailModal>
    </>
  );
}

export default BlogDetail;
