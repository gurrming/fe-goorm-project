export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  id: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export type TSignupForm = {
  email: string;
  password: string;
  nickname: string;
};
