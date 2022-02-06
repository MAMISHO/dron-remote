declare const sails: any;
import { Device, DeviceRequest } from '../interfaces';

/*export function hello(req:any, res:any, next: Function):any {
  res.status(200).send('Hello from Typescript!');
}*/

export class IDeviceRepository {
  private static _instance: IDeviceRepository;

  private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public async findOne(filter: DeviceRequest): Promise<Device> {
    if (!filter || (!filter.id && !filter.uuid)) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    const device: Device = await sails.models.device.find({
      id: filter.id,
      uuid: filter.uuid,
    });
    return Promise.resolve(device);
  }

  public async findAll(filter: DeviceRequest): Promise<Device[]> {
    if (!filter || (filter.id && filter.uuid)) {
      return Promise.reject(new Error('operación no permitida, no se pueden filtrar por ID'));
    }
    const finalFilter: any =  {};
    if (filter.userId) {
      finalFilter.owner = filter.userId;
    }
    const devices: Device[] = await sails.models.device.find(finalFilter);
    if (devices) {
      return Promise.resolve(devices);
    }
    return Promise.resolve([]);
  }
}

export const DeviceRepository = IDeviceRepository.Instance;

