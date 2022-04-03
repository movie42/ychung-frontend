export const getRequest = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
  credential: "include",
  mode: "cors",
};

export const postRequest = (body: any, csrfToken: string) => {
  const data = JSON.stringify({ ...body });
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: data,
    credentials: "include",
    mode: "cors",
  };
};
