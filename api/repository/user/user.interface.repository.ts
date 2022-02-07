import { User } from 'api/interfaces';

export interface IUserRepository {
  get(id: number): User;
  getByUUID(uuid: string): User;
  add(user: User): void;
  update(User: User): void;
  remove(user: User): void;
}

/*export class Repository {
  private static _instance: Repository;

  // private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}*/
