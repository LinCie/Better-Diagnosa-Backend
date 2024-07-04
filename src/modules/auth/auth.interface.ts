import { User } from '@/entities/User.entity';
import { Request } from 'express';

export interface loginRequest extends Request {
  user: User;
}

export interface signUpBody {
  username: string;
  password: string;
}
