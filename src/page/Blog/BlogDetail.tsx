import React, { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useLocation, useNavigate, useParams } from "react-router";
import { loginState } from "../../state/Authrization";
import { useSetView } from "../../utils/hooks/useSetView";
import { blog, IBlogItems } from "../../state/blog.atom";
import useDelete from "../../utils/hooks/useDelete";
import { previewParagraph } from "../../utils/utilities/previewParagraph";

import {
  Button,
  PageDetailModal,
  PageDetailModalHeader,
  Viewer,
  ConfirmDeleteModal,
  SEO,
} from "@/components";

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
        keywords={`?????????, ???????????? ????????? ?????????, ?????? ?????????, ${data?.title}`}
      />
      {isConfirmModal && (
        <ConfirmDeleteModal
          title="????????? ???????????? ?????????????????????????"
          subtitle="???????????? ???????????? ????????? ??? ????????????."
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
