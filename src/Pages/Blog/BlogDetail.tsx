import { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useNavigate, useParams } from "react-router";
import { useModalContorl, useSetView } from "@/lib/hooks";
import { blog, IBlogItems, loginState } from "@/lib/state";

import {
  Button,
  PageDetailModal,
  PageDetailModalHeader,
  Viewer,
  ConfirmDeleteModal
} from "@/Components";
import { useDeleteBlogPost } from "./hooks";

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
  const { postId } = useParams();
  const { isLogin } = useRecoilValue(loginState);
  const setPostData = useSetRecoilState(blog);
  const countViews = useSetView(`/api/blog/${postId}/count-views`, setPostData);

  const { isConfirm, isModal, setIsConfirm, setIsModal } = useModalContorl();
  const { mutate: deleteBlogPostMutate } = useDeleteBlogPost();

  const handleUpdate = () => {
    navigate(`/blog/${data?._id}/update`);
  };

  const handleDelete = () => {
    setIsModal(true);
  };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (isConfirm && postId) {
      deleteBlogPostMutate({ id: postId });
    }
  }, [isConfirm, postId]);

  return (
    <>
      isModal && (
      <ConfirmDeleteModal
        title="블로그 포스트를 삭제하시겠습니까?"
        subtitle="삭제하면 데이터를 복구할 수 없습니다."
        setIsConfirm={setIsConfirm}
        setIsModal={setIsModal}
      />
      )
      <PageDetailModal
        pageRoot="blog"
        setDetailItem={setDetailItem}
      >
        <PageDetailModalHeader {...data}>
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
        </PageDetailModalHeader>
        <Viewer paragraph={data?.paragraph} />
      </PageDetailModal>
    </>
  );
}

export default BlogDetail;
