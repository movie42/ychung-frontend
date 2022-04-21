import React, { useEffect } from "react";
import styled from "styled-components";
import BlogItems from "./BlogItems";
import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { blog, blogModalControler } from "../../state/blog.atom";
import Loading from "../../components/Loading";

const Wrapper = styled.div`
  width: 100%;
`;

const ListContainer = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

const BlogComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${(props) => props.theme.grayBackgroundColor};
    font-size: 4rem;
    &:hover {
      color: ${(props) => props.theme.basicColor};
    }
  }
`;

export interface IBlogItems {
  _id: string;
  title: string;
  paragraph: string;
  creator: {
    _id: string;
    name: string;
    userName: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

function Blog() {
  const { id } = useParams();
  const [detailItem, setDetailItem] = useRecoilState(blog);
  const [blogModalState, setBlogModalState] =
    useRecoilState(blogModalControler);

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(
    "posts",
    async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );

  const onClick = (id: string) => {
    const [detailItem] = posts.filter((item: IBlogItems) => item._id === id);
    setBlogModalState(true);
    setDetailItem({ ...detailItem });
  };

  useEffect(() => {
    if (id && !isLoading) {
      const [detailItem] = posts.filter((item: IBlogItems) => item._id === id);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isLoading]);

  return (
    <>
      {<AnimatePresence>{isLoading && <Loading />}</AnimatePresence>}
      {!isLoading && (
        <Wrapper>
          <BlogComponentInfoContainer>
            <h1>블로그</h1>
            <Link to={"/blog/create"}>
              <AiFillPlusCircle />
            </Link>
          </BlogComponentInfoContainer>
          <ListContainer>
            {posts?.map((post: IBlogItems) => (
              <BlogItems key={post._id} post={post} />
            ))}
          </ListContainer>
          <AnimatePresence>{blogModalState && <Outlet />}</AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}

export default Blog;
