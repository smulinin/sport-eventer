import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://beta.sosportom.ru/graphql/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
