import { User } from './user.model';

/**
 * Device.ts
 *
 * @description :: Modelo que representa un Dispositivo
 */
export interface IDevice {
  name: string;
  type: string;
  email: string;
  password: string;
  owner: User;
}

export class Device {
  constructor(
    public name?: string,
    public type?: string,
    public email?: string,
    public password?: string,
    public owner?: User
  ) {}
}

export interface DeviceRequest {
  id?: number;
  uuid?: string;
  name?: string;
  userId?: number;
}
