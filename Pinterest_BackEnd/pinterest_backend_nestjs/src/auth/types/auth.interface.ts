import { user } from '@prisma/client';
import { ResponseApi } from 'src/types/ApiResponse';

// Response Type When user login success
export type Login = {
  access_token: string;
};

export type LoginResponse = ResponseApi<Login>;

export type UserResponse = ResponseApi<
  Omit<user, 'password' | 'user_id' | 'token'>
>;
