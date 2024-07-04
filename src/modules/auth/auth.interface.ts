import { Request } from 'express';

export interface loginRequest extends Request {
  user: any;
}

export interface signUpBody {
  username: string;
  password: string;
}
