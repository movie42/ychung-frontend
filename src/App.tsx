import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, snackbarState } from "@/lib/state";
import { SEO, Snackbar } from "@/components";
import { Routers } from "@/routes";
import { USER_LOGIN_INFO_KEY } from "./lib/constants/constants";

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
      <SEO />
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      <Routers />
    </>
  );
}

export default App;
