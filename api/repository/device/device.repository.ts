declare const sails: any;
import { Device, DeviceRequest } from '../../interfaces';

export class DeviceRepositoryImpl {
  //  implements IDeviceRepository {
  private static _instance: DeviceRepositoryImpl;

  private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public get(id: number): Promise<Device> {
    const filter: DeviceRequest = { id };
    return this.findOne(filter);
  }

  public getDevicesByUser(userId: number): Promise<Device[]> {
    const filter: DeviceRequest = { userId };
    return this.findAll(filter);
  }

  getByUUID(uuid: string): Promise<Device> {
    return this.findOne({ uuid });
  }

  add(device: Device): void {
    throw new Error('Method not implemented.');
  }
  update(device: Device): void {
    throw new Error('Method not implemented.');
  }
  remove(device: Device): void {
    throw new Error('Method not implemented.');
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
      return Promise.reject(
        new Error('operación no permitida, no se pueden filtrar por ID')
      );
    }
    const finalFilter: any = {};
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

export const DeviceRepository = DeviceRepositoryImpl.Instance;
