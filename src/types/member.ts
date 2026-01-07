export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    memberId: number;
    memberNickname: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export type TSignupForm = {
  email: string;
  password: string;
  nickname: string;
};
