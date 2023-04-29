import { Navigate, Route, Routes } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { worshipDetail, worshipModalControler } from "@/lib/state";
import { Worship } from "@/Pages/Worship";
import { PrayerContainer } from "@/Pages/Worship/Prayer";
import {
  WeekliesContainer,
  WeekliesCreate,
  WeekliesDetail,
  WeekliesUpdate
} from "@/Pages/Worship/Weeklies";
import { ProtectRouter } from "@/Routes";
import PrayerCreate from "@/Pages/Worship/Prayer/PrayerCreate";
import PrayerUpdate from "@/Pages/Worship/Prayer/PrayerUpdate";

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
        <Route
          path="weeklies/create"
          element={<WeekliesCreate />}
        />
        <Route
          path="prayer/create"
          element={<PrayerCreate />}
        />
        <Route
          path=":weekliesId/update"
          element={<WeekliesUpdate data={weeklyItem} />}
        />
        <Route
          path="prayer/:prayerId"
          element={<PrayerUpdate />}
        />
      </Route>
      <Route element={<Worship />}>
        <Route
          index
          element={<Navigate to="weeklies" />}
        />
        <Route
          path="weeklies"
          element={<WeekliesContainer />}
        >
          <Route
            path=":weekliesId"
            element={<WeekliesDetail setDetailItem={setWeeklyModalState} />}
          />
        </Route>
        <Route
          path="prayer"
          element={<PrayerContainer />}
        />
      </Route>
    </Routes>
  );
};

export default WorshipRouter;
