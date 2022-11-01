import { noticeModalControler } from "@/lib/state";
import {
  Notice,
  NoticeCreate,
  NoticeDetail,
  NoticeUpdate
} from "@/page/Notice";
import { Route, Routes } from "react-router";
import { useSetRecoilState } from "recoil";
import ProtectRouter from "./ProtectRouter";

interface INoticeRouterProps {
  isLogin: boolean;
  authority: number;
}

const NoticeRouter = ({ isLogin, authority }: INoticeRouterProps) => {
  const setNoticeModalState = useSetRecoilState(noticeModalControler);

  return (
    <Routes>
      <Route path="" element={<Notice />}>
        <Route
          path=":noticeId"
          element={<NoticeDetail setDetailItem={setNoticeModalState} />}
        />
      </Route>
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && authority < 3}
            redirectPath={"/notice"}
          />
        }
      >
        <Route path="create" element={<NoticeCreate />} />
        <Route path=":noticeId/update" element={<NoticeUpdate />} />
      </Route>
    </Routes>
  );
};

export default NoticeRouter;
