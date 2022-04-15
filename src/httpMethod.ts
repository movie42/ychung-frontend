export const getRequest: RequestInit = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
  credentials: "include",
  mode: "cors",
};

export const postRequest = (body: any, csrfToken: string): RequestInit => {
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

export const postRequestMultipartFormData = (
  body: any,
  csrfToken: string
): RequestInit => {
  return {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body,
    credentials: "include",
    mode: "cors",
  };
};
