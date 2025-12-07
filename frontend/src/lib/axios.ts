import axios from "axios";

export const axiosInstance = axios.create({
  //baseURL: import.meta.env.VITE_API_URL,

  baseURL: "https://csci-6234-ood-1.onrender.com",
  withCredentials: true, // ✅ Important for sending cookies and Clerk auth headers
});
