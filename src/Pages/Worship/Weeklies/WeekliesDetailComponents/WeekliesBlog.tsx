import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetBlogPosts } from "@/Pages/Blog/hooks";

const ListContainer = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  a {
    font-size: 2.2rem;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    p {
      margin: 0 0 1rem 0;
    }
    div {
      font-size: 1.6rem;
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

function WeekliesBlog() {
  const { isLoading, data: posts } = useGetBlogPosts();

  return isLoading ? (
    <p>블로그 불러오는 중...</p>
  ) : (
    <ListContainer>
      {posts?.slice(0, 3).map((post) => (
        <ListItem key={post._id}>
          <Link to={`/blog/${post._id}`}>
            <p>{post.title}</p>
            <div>
              자세히 보기
              <span>
                <BsArrowRight />
              </span>
            </div>
          </Link>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default WeekliesBlog;
