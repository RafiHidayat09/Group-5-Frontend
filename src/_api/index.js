import axios from "axios"


const url = "http://127.0.0.1:8000"

export const API  = axios.create({
  baseURL: `${url}/api`, // Tulis API (local)yang telah dibangun
})
// Interceptor → otomatis mengirim token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const psikologImageStorage = `${url}/storage/psikolog`; // path folder storage psikolog
export const articleImageStorage = `${url}/storage/articles`; // path folder storage artikel



