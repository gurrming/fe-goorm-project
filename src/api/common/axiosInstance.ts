import axios, { AxiosRequestConfig } from 'axios';

const reIssueAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

interface RequestConfig extends AxiosRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: AxiosRequestConfig['params'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
}

const request = async <T>(config: RequestConfig): Promise<T> => {
  const { data } = await axiosInstance.request<T>({
    ...config,
  });
  return data;
};

export { request };

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.code === 'AUTH401_2'
      // error.response.data.message === 'Access Token이 만료되었습니다.'
    ) {
      originalRequest._retry = true;

      try {
        const res = await reIssueAxios.post('/api/member/reissue');

        const newAccessToken: string = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
