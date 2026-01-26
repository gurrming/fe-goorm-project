export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  result: {
    memberId: number;
    memberNickname: string;
    accessToken: string;
    refreshToken: string;
  };
  isSuccess: boolean;
  code: string;
  message: string;
};

export type TLoginErrorResponse = {
  code: string;
  message: string;
  name: string;
  response: {
    data: {
      code: string;
      isSuccess: boolean;
      message: string;
    };
  };
};

export type TSignupForm = {
  email: string;
  password: string;
  nickname: string;
};

export type TExistsResponse = {
  isExists: boolean;
};
