class API {
  async getData<TData>(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async postData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async patchData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async putData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async deleteData<TData>(url: string) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }
}

export default API;
