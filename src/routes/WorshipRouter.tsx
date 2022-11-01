import { Navigate, Route, Routes } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { worshipDetail, worshipModalControler } from "@/lib/state";
import { Worship } from "@/page/Worship";
import { PrayerContainer } from "@/page/Worship/Prayer";
import {
  WeekliesContainer,
  WeekliesCreate,
  WeekliesDetail,
  WeekliesUpdate
} from "@/page/Worship/Weeklies";
import { ProtectRouter } from "@/routes";

interface IWorshipRouterProps {
  isLogin: boolean;
  authority: number;
}

const WorshipRouter = ({ isLogin, authority }: IWorshipRouterProps) => {
  const weeklyItem = useRecoilValue(worshipDetail);
  const setWeeklyModalState = useSetRecoilState(worshipModalControler);

  return (
    <Routes>
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && authority < 3}
            redirectPath="/worship/weeklies"
          />
        }
      >
        <Route path="weeklies/create" element={<WeekliesCreate />} />
        <Route
          path=":weekliesId/update"
          element={<WeekliesUpdate data={weeklyItem} />}
        />
      </Route>
      <Route element={<Worship />}>
        <Route index element={<Navigate to="weeklies" />} />
        <Route path="weeklies" element={<WeekliesContainer />}>
          <Route
            path=":weekliesId"
            element={<WeekliesDetail setDetailItem={setWeeklyModalState} />}
          />
        </Route>
        <Route path="prayer" element={<PrayerContainer />} />
      </Route>
    </Routes>
  );
};

export default WorshipRouter;
