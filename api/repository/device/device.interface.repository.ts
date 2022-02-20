import { Device } from 'api/interfaces';

export interface IDeviceRepository {
  get(id: number): Device;
  getByUUID(uuid: string): Device;
  add(device: Device): void;
  update(device: Device): void;
  remove(device: Device): void;
}

/*export class Repository {
  private static _instance: Repository;

  // private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}*/
