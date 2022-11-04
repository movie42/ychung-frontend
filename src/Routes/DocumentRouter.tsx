import {
  Account,
  AccountDetail,
  Application,
  ApplicationDetail,
  Documents,
  Menuel,
  MenuelDetail,
  Rules,
  RulesDetail
} from "@/Pages/Document";
import { Route, Routes } from "react-router";

// interface IDocumentRouterProps {
//   isLogin: boolean;
//   authority: number;
// }

const DocumentRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Documents />}>
        <Route path="rule" element={<Rules />}>
          <Route path=":id" element={<RulesDetail />} />
        </Route>
        <Route path="menual" element={<Menuel />}>
          <Route path=":id" element={<MenuelDetail />} />
        </Route>
        <Route path="applications" element={<Application />}>
          <Route path=":id" element={<ApplicationDetail />} />
        </Route>
        <Route path="account" element={<Account />}>
          <Route path=":id" element={<AccountDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DocumentRouter;
