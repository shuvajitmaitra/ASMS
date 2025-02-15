// axiosInstance.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "@/redux/store";
import { setAccessToken, setRefreshToken } from "@/redux/userReducer/userReducer";

const production = true;
const BASE_URL = production ? "https://sms-backend-tawny.vercel.app/api/v1" : "http://10.0.2.2:5001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    config.headers = config.headers || axios.AxiosHeaders.from({});
    const { accessToken } = store.getState().user;
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string | null) => {
              if (token && originalRequest.headers) {
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        const { refreshToken } = store.getState().user;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${BASE_URL}/user/refresh`, { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        store.dispatch(setAccessToken(newAccessToken));
        store.dispatch(setRefreshToken(newRefreshToken));

        processQueue(null, newAccessToken);
        if (originalRequest.headers) {
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
        }
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
