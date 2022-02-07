/**
 * User.ts
 *
 * @description :: Modelo que representa un Usuario
 */

import { Device } from './device.model';

export enum UserRoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  devices: Device[];
}

export class User {
  constructor(
    public name?: string,
    public surname?: string,
    public email?: string,
    public password?: string,
    public resetPasswordToken?: string,
    public role?: UserRoleType,
    public status?: boolean,
    public devices?: Device[]
  ) {}
}

export interface UserRequest {
  id?: number;
  uuid?: string;
  name?: string;
  email?: string;
  status?: boolean;
}
