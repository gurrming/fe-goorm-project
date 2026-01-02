export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export type TSignupForm = {
  email: string;
  password: string;
  nickname: string;
};
