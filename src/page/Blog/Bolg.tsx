import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { blog, blogModalControler } from "../../state/blog.atom";
import { loginState } from "../../state/Authrization";
import { IBlogItems } from "../../state/blog.atom";
import { useGet } from "../../lib/utils/hooks/useGet";

import { Loading, ListItem, ListContainer, SEO } from "@/components";
import SkeletonForListItem from "@/components/Loading/Skeletons/SkeletonForListItem";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 8rem;
`;

const BlogComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${(props) => props.theme.color.gray300};
    font-size: 4rem;
    &:hover {
      color: ${(props) => props.theme.color.primary400};
    }
  }
`;

function Blog() {
  const { isLogin } = useRecoilValue(loginState);
  const { id } = useParams();
  const setDetailItem = useSetRecoilState(blog);
  const [blogModalState, setBlogModalState] =
    useRecoilState(blogModalControler);

  const {
    isSuccess,
    isRefetching,
    isLoading,
    data: posts,
  } = useGet<IBlogItems[]>({
    url: `/api/blog`,
    queryKey: "posts",
  });

  const onClick = (id: string) => {
    if (posts) {
      const [detailItem] = posts.filter((item) => item._id === id);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (id && isSuccess && !isRefetching) {
      const [detailItem] = posts.filter((item) => item._id === id);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isSuccess, isRefetching]);

  return (
    <>
      <SEO
        title="블로그"
        keywords="블로그, 양정교회 청년부 블로그, 양청 블로그"
      />
      <Wrapper>
        <BlogComponentInfoContainer>
          <h1>블로그</h1>
          {isLogin && (
            <Link to={"/blog/create"}>
              <AiFillPlusCircle />
            </Link>
          )}
        </BlogComponentInfoContainer>
        {posts && (
          <ListContainer
            isLoading={isLoading && isRefetching}
            data={posts}
            renderFunc={(item) => (
              <ListItem
                key={item._id}
                data={item}
                onClick={() => onClick(item._id)}
              />
            )}
            skeletonRenderFunc={(item: number[], index: number) => (
              <SkeletonForListItem key={index} />
            )}
          />
        )}
        <AnimatePresence>{blogModalState && <Outlet />}</AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Blog;
