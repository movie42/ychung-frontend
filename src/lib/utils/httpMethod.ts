export const getRequest: RequestInit = {
  method: "GET",
  headers: {
    "Content-type": "application/json"
  },
  credentials: "include",
  mode: "cors"
};

export const getWeekliesData = async () => {
  const response = await fetch("/api/worship", getRequest);
  const { data } = await response.json();
  return data;
};

export const postOrPatchRequest = (
  body: any,
  csrfToken: string,
  method: "POST" | "PATCH"
): RequestInit => {
  const data = JSON.stringify({ ...body });
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    body: data,
    credentials: "include",
    mode: "cors"
  };
};

export const postRequestMultipartFormData = (
  body: any,
  csrfToken: string
): RequestInit => {
  return {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken
    },
    body,
    credentials: "include",
    mode: "cors"
  };
};

export const deleteRequest = (csrfToken: string): RequestInit => ({
  method: "DELETE",
  headers: {
    "Content-type": "application/json",
    "X-CSRF-Token": csrfToken
  },
  credentials: "include",
  mode: "cors"
});
