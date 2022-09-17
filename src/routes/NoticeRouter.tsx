import { MainLayout } from "@/components";
import { notice, noticeModalControler } from "@/lib/state";
import {
  Notice,
  NoticeCreate,
  NoticeDetail,
  NoticeUpdate,
} from "@/page/Notice";
import React from "react";
import { Route, Routes } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProtectRouter from "./ProtectRouter";

interface INoticeRouterProps {
  isLogin: boolean;
  authority: number;
}

const NoticeRouter = ({ isLogin, authority }: INoticeRouterProps) => {
  const noticeItem = useRecoilValue(notice);
  const setNoticeModalState = useSetRecoilState(noticeModalControler);

  return (
    <Routes>
      <Route path="" element={<Notice />}>
        <Route
          path=":noticeId"
          element={
            <NoticeDetail
              setDetailItem={setNoticeModalState}
              data={noticeItem}
            />
          }
        />
      </Route>
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && authority < 3}
            redirectPath={"/notice"}
          />
        }>
        <Route path="create" element={<NoticeCreate />} />
        <Route
          path=":noticeId/update"
          element={<NoticeUpdate data={noticeItem} />}
        />
      </Route>
    </Routes>
  );
};

export default NoticeRouter;
