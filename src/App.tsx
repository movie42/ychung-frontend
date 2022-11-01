import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, snackbarState } from "@/lib/state";
import { SEO, Snackbar } from "@/components";
import { Routers } from "@/routes";

function App() {
  const currentLogin = useSetRecoilState(loginState);
  const currentUser = JSON.parse(localStorage.getItem("ycUser") || "{}");
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    currentLogin((state) => ({ ...state, ...currentUser }));
    return;
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
