export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}
