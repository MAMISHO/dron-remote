declare const sails: any;
import { User, UserRequest } from '../../interfaces';

export class UserRepositoryImpl {
  //  implements IUserRepository {
  private static _instance: UserRepositoryImpl;

  private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public get(id: number): Promise<User> {
    const filter: UserRequest = { id };
    return this.findOne(filter);
  }

  getByUUID(uuid: string): User {
    throw new Error('Method not implemented.');
  }

  add(user: User): void {
    throw new Error('Method not implemented.');
  }
  update(User: User): void {
    throw new Error('Method not implemented.');
  }
  remove(user: User): void {
    throw new Error('Method not implemented.');
  }

  public async findOne(filter: UserRequest): Promise<User> {
    if (!filter || (!filter.id && !filter.uuid)) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    const user: User[] = await sails.models.user.find({
      id: filter.id,
      uuid: filter.uuid,
      email: filter.email,
    });
    if (!user || user.length > 1) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    return Promise.resolve(user.pop());
  }

  public async findAll(filter: UserRequest): Promise<User[]> {
    if (!filter || (filter.id && filter.uuid) || filter.email) {
      return Promise.reject(
        new Error('operación no permitida, no se pueden filtrar por ID')
      );
    }
    const finalFilter: any = {};
    const users: User[] = await sails.models.device.find(finalFilter);
    if (users) {
      return Promise.resolve(users);
    }
    return Promise.resolve([]);
  }
}

export const UserRepository = UserRepositoryImpl.Instance;
