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

  getByUUID(uuid: string): Promise<User> {
    return this.findOne({ uuid });
  }

  add(user: User): Promise<User> {
    return this.saveUser(user);
  }
  update(user: User): Promise<User> {
    return this.updateUser(user);
  }
  remove(user: User): Promise<User> {
    return this.deleteUser(user);
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
    //.populate('devices');
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

  private async saveUser(user: User): Promise<User> {
    const userSaved: User = await sails.models.user.create(user);
    return userSaved;
  }

  private async updateUser(user: User): Promise<User> {
    const userSaved: User = await sails.models.user
      .updateOne({ uuid: user.uuid })
      .set(user);
    return userSaved;
  }

  private async deleteUser(user: User): Promise<User> {
    const userToDelete: User = await sails.models.user.findOne({
      uuid: user.uuid,
    });
    if (!userToDelete) {
      return null;
    }
    const userSaved: User = await sails.models.user
      .updateOne({ uuid: userToDelete.uuid })
      .set({ status: true });
    return userSaved;
  }
}

export const UserRepository = UserRepositoryImpl.Instance;
