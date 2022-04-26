import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { blog, blogModalControler } from "../../state/blog.atom";
import Loading from "../../components/Loading";
import ListItem from "../../components/List/ListItem";
import ListContainer from "../../components/List/ListContainer";
import { loginState } from "../../state/Authrization";

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
  const { login } = useRecoilValue(loginState);
  const { id } = useParams();
  const [detailItem, setDetailItem] = useRecoilState(blog);
  const [blogModalState, setBlogModalState] =
    useRecoilState(blogModalControler);

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery<IBlogItems[]>(
    "posts",
    async () => {
      const response = await fetch(`/api/blog`, {
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
    if (posts) {
      const [detailItem] = posts.filter((item) => item._id === id);
      setBlogModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (id && !isLoading && posts) {
      const [detailItem] = posts.filter((item) => item._id === id);
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
            {login && (
              <Link to={"/blog/create"}>
                <AiFillPlusCircle />
              </Link>
            )}
          </BlogComponentInfoContainer>

          {posts && (
            <ListContainer
              data={posts}
              renderData={(item) => (
                <ListItem data={item} onClick={() => onClick(item._id)} />
              )}
            />
          )}

          <AnimatePresence>{blogModalState && <Outlet />}</AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}

export default Blog;
