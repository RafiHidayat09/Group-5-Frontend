import axios from "axios";

const url = "http://127.0.0.1:8000"

export const API  = axios.create({
  baseURL: `${url}/api`,
  headers: {
   // "Content-Type": "application/json",
  },
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const psikologImageStorage = `${url}/storage/psikolog`;
export const articleImageStorage = `${url}/storage/articles`;

export default API;

