import axiosInstance from './common/axiosInstance';
import type { TLoginForm, TLoginResponse, TSignupForm } from '../types/member';

export const postLogin = async (data: TLoginForm) => {
  try {
    const response = await axiosInstance.post<TLoginResponse>('/api/member/login', data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return Promise.reject(error);
  }
};

export const postSignup = async (data: TSignupForm) => {
  try {
    const response = await axiosInstance.post('/api/member/signup', data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return Promise.reject(error);
  }
};

export const postLogout = async () => {
  try {
    const response = await axiosInstance.post('/api/member/logout');
    return response.data;
  } catch (error) {
    // console.log(error);
    return Promise.reject(error);
  }
};
