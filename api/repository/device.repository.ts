declare const sails: any;
import { Device, DeviceRequest } from '../interfaces';

/*export function hello(req:any, res:any, next: Function):any {
  res.status(200).send('Hello from Typescript!');
}*/

export class IDeviceRepository {
  private static _instance: IDeviceRepository;

  private constructor() {}

  public async findOne(filter: DeviceRequest): Promise<Device> {
    if (!filter || (!filter.id && !filter.uuid)) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    const device = await sails.models.device.find({
      id: filter.id,
      uuid: filter.uuid,
    });
    if (device) {
      const result = new Device(device);
      return Promise.resolve(result);
    } else {
      return Promise.resolve(device);
    }
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}

export const DeviceRepository = IDeviceRepository.Instance;

/*
export class DeviceRepository {
  public async findOne(filter: DeviceRequest): Promise<Device> {
    const device = await sails.models.Device.find({
      id: filter.id,
      uuid: filter.uuid,
    });
    if (device) {
      const result = new Device(device);
      return result;
    } else {
      return new Device(device);
    }
    return new Promise<Device>((resolve, reject) => {
      resolve(new Device());
    });
  }
}
*/
