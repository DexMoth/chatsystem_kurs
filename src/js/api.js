import axios from 'axios'

export const API_URL = "http://localhost:8087/api"
export const axiosDB = axios.create({
    baseURL: API_URL,
    withCredentials: true, // для куков
    headers: {
        'Content-Type': 'application/json',
    },
})