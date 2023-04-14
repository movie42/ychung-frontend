import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";

import { blog, blogModalControler } from "@/lib/state";

import {
  ListItem,
  ListContainer,
  SEO,
  Authorization,
  SkeletonForListItem
} from "@/Components";

import { BlogPostData } from "./hooks";
import { useGetInfinityItem, useIntersect } from "@/lib/hooks";

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

const List = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

function Blog() {
  const { postId } = useParams();
  const setDetailItem = useSetRecoilState(blog);
  const [blogModalState, setBlogModalState] =
    useRecoilState(blogModalControler);

  const {
    data,
    isSuccess,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage
  } = useGetInfinityItem<BlogPostData>({
    pageParam: 0,
    size: 10,
    url: "/api/blog",
    queryKey: ["posts"]
  });

  const posts = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  const ref = useIntersect(async (entry, observer) => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
    observer.unobserve(entry.target);
  });

  const onClick = (id: string) => {
    if (posts) {
      const [detailItem] = posts.filter((item) => item._id === id);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (postId && isSuccess && !isRefetching) {
      const [detailItem] = posts.filter((item) => item._id === postId);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [postId, isSuccess, isRefetching]);

  return (
    <>
      <Wrapper>
        <BlogComponentInfoContainer>
          <h1>블로그</h1>
          <Authorization authority={3}>
            <Link to={"/blog/create"}>
              <AiFillPlusCircle />
            </Link>
          </Authorization>
        </BlogComponentInfoContainer>
        {posts && (
          <ListContainer
            isRefetching={isRefetching}
            isLoading={isLoading && isRefetching}
            data={posts}
            renderFunc={(item) => (
              <ListItem
                key={item._id}
                data={item}
                onClick={() => onClick(item._id)}
              />
            )}
          />
        )}
        {isLoading && (
          <List>
            <SkeletonForListItem />
          </List>
        )}
        <div ref={ref}></div>
        <AnimatePresence>{blogModalState && <Outlet />}</AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Blog;
