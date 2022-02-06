declare const sails: any;
import { User, UserRequest } from '../interfaces';

/*export function hello(req:any, res:any, next: Function):any {
  res.status(200).send('Hello from Typescript!');
}*/

export class IUserRepository {
  private static _instance: IUserRepository;

  private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public async findOne(filter: UserRequest): Promise<User> {
    if (!filter || (!filter.id && !filter.uuid)) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    const user: User = await sails.models.user.find({
      id: filter.id,
      uuid: filter.uuid,
      email: filete.email
    });
    return Promise.resolve(user);
  }

  public async findAll(filter: UserRequest): Promise<User[]> {
    if (!filter || filter.id && filter.uuid || filter.email) {
      return Promise.reject(new Error('operación no permitida, no se pueden filtrar por ID'));
    }
    const finalFilter: any =  {};
    const users: User[] = await sails.models.device.find(finalFilter);
    if (users) {
      return Promise.resolve(users);
    }
    return Promise.resolve([]);
  }
}

export const DeviceRepository = IDeviceRepository.Instance;

