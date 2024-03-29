import { useEffect } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import { USER_LOGIN_INFO_KEY } from "./lib/constants/constants";

import { Snackbar } from "@/Components";
import { loginState, snackbarState } from "@/lib/state";
import { Routers } from "@/Routes";

function App() {
  const currentLogin = useSetRecoilState(loginState);
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(USER_LOGIN_INFO_KEY) || "{}"
    );

    if (!("email" in currentUser)) {
      currentLogin((state) => ({ ...state, isLogin: false }));
      return;
    }

    currentLogin((state) => ({ ...state, ...currentUser }));
  }, []);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item
            key={id}
            data-set={id}
            message={message}
            type={type}
          />
        ))}
      </Snackbar>
      <Routers />
    </>
  );
}

export default App;
