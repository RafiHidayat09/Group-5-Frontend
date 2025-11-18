import axios from "axios"


const url = "http://127.0.0.1:8000"

export const API  = axios.create({
  baseURL: `${url}/api`, // Tulis API (local)yang telah dibangun
})

export const psikologImageStorage = `${url}/storage/psikolog`; // path folder storage psikolog



