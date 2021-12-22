const DeviceType = {
  Dron: 'DRON',
  Other: 'OTHER'
} as const;
export type DeviceType =  typeof DeviceType[keyof typeof DeviceType];

const DeviceStatus = {
  Connected: 'CONNECTED',
  Ready: 'READY',
  Unconnected: 'UNCONNECTED',
  Configured: 'CONFIGURED'
} as const;
export type DeviceStatus =  typeof DeviceStatus[keyof typeof DeviceStatus];

export interface IDevice {
  name?: string,
  type?: DeviceType,
  email?: string,
  password?: string,
  owner?: number,
  status?: DeviceStatus,
  uuid?: string,
  isReady(): boolean,
  isConnected(): boolean
}

export class Device implements IDevice {
  constructor(
    public name?: string,
    public type?: DeviceType,
    public email?: string,
    public password?: string,
    public owner?: number,
    public status?: DeviceStatus,
    public uuid?: string,
    ) {}
  isReady(): boolean {
    return this.status && this.status === DeviceStatus.Ready;
  }
  isConnected(): boolean {
    return this.status && this.status === DeviceStatus.Connected;
  }
}
