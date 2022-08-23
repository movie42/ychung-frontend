import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

class API {
  async getData(url: string) {
    const response = await instance.get(url);
    return response.data;
  }

  async postData<TVariable>(url: string, body: TVariable) {
    const { data: CSRFToken } = await this.getData("/api/csrf-token");

    const response = await instance.post(
      url,
      { ...body },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": CSRFToken,
        },
      }
    );

    return response.data;
  }

  async patchData<TVariable>(url: string, body: TVariable) {
    const { data: CSRFToken } = await this.getData("/api/csrf-token");

    const response = await instance.patch(
      url,
      { ...body },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": CSRFToken,
        },
      }
    );

    return response.data;
  }

  async putData<TVariable>(url: string, body: TVariable) {
    const { data: CSRFToken } = await this.getData("/api/csrf-token");

    const response = await instance.put(
      url,
      { ...body },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": CSRFToken,
        },
      }
    );

    return response.data;
  }

  async deleteData(url: string) {
    const { data: CSRFToken } = await this.getData("/api/csrf-token");

    const response = await instance.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
    });

    return response.data;
  }
}

export const api = new API();
