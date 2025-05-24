import axios from "axios";

export const instance = () => {
  const data = axios.create({
    baseURL: "https://reqres.in/api/",
  });

  data.interceptors.request.use(async function (config: any) {
    const accessToken = localStorage.getItem("token");

    const apiKey = "reqres-free-v1";

    console.log("accessToken: ", accessToken);

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["x-api-key"] = apiKey;
    console.log("config: ", config);

    return config;
  });

  return data;
};

export default instance;
