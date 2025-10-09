export type LoginForm = {
  email: string;
  password: string;
  isRemember: boolean;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutRes = {
  message: string;
};

export type UserRes = {
  email: string;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
