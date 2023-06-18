import axios, { AxiosRequestConfig } from "axios";
import { getBaseUrl } from "@/lib/urls";

export const axiosClient = axios.create({
  maxBodyLength: Infinity,
  baseURL: "https://shadcn-social-media-app.vercel.app/api",
});

export const config: AxiosRequestConfig = {
  withCredentials: true,
  maxBodyLength: Infinity,
};
