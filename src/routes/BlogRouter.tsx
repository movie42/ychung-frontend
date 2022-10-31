import { Route, Routes } from "react-router";
import { Blog, BlogCreate, BlogDetail, BlogUpdate } from "@/page/Blog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blog, blogModalControler } from "@/lib/state";
import ProtectRouter from "./ProtectRouter";

interface IBlogRouterProps {
  isLogin: boolean;
  authority: number;
}

const BlogRouter = ({ isLogin, authority }: IBlogRouterProps) => {
  const blogItem = useRecoilValue(blog);
  const setBlogModalState = useSetRecoilState(blogModalControler);
  return (
    <Routes>
      <Route path="" element={<Blog />} />
      <Route
        path=":postId"
        element={
          <BlogDetail setDetailItem={setBlogModalState} data={blogItem} />
        }
      />
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && authority < 3}
            redirectPath="/worship/weeklies"
          />
        }>
        <Route path="create" element={<BlogCreate />} />
        <Route path=":postId/update" element={<BlogUpdate data={blogItem} />} />
      </Route>
    </Routes>
  );
};

export default BlogRouter;
