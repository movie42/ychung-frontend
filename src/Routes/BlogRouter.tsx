import { Route, Routes } from "react-router";

import { useRecoilValue, useSetRecoilState } from "recoil";

import ProtectRouter from "./ProtectRouter";

import { blog, blogModalControler } from "@/lib/state";
import { Blog, BlogCreate, BlogDetail, BlogUpdate } from "@/Pages/Blog";

interface IBlogRouterProps {
  isLogin: boolean;
  authority: number;
}

const BlogRouter = ({ isLogin, authority }: IBlogRouterProps) => {
  const blogItem = useRecoilValue(blog);
  const setBlogModalState = useSetRecoilState(blogModalControler);
  return (
    <Routes>
      <Route
        path="/"
        element={<Blog />}
      >
        <Route
          path=":postId"
          element={
            <BlogDetail
              setDetailItem={setBlogModalState}
              data={blogItem}
            />
          }
        />
      </Route>
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && authority < 3}
            redirectPath="/blog"
          />
        }
      >
        <Route
          path="create"
          element={<BlogCreate />}
        />
        <Route
          path=":postId/update"
          element={<BlogUpdate data={blogItem} />}
        />
      </Route>
    </Routes>
  );
};

export default BlogRouter;
