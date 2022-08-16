import React, { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useLocation, useNavigate, useParams } from "react-router";
import { loginState } from "../../state/Authrization";
import { useSetView } from "../../lib/utils/hooks/useSetView";
import { blog, IBlogItems } from "../../state/blog.atom";
import useDelete from "../../lib/utils/hooks/useDelete";
import { previewParagraph } from "../../lib/utils/utilities/previewParagraph";

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
        keywords={`블로그, 양정교회 청년부 블로그, 양청 블로그, ${data?.title}`}
      />
      {isConfirmModal && (
        <ConfirmDeleteModal
          title="블로그 포스트를 삭제하시겠습니까?"
          subtitle="삭제하면 데이터를 복구할 수 없습니다."
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
