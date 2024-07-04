import { Request } from 'express';

export interface loginRequest extends Request {
  user: {
    username: string;
    password: string;
  };
}

export interface signUpBody {
  username: string;
  password: string;
}
