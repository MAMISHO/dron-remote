import { User } from 'api/interfaces';
import { UserRepository } from '../../repository/user/user.repository';

export const UserHelper = {
  _getUserById: async function (id: number): Promise<User> {
    if (!id) {
      return null;
    }
    return UserRepository.get(id);
  },

  _getUserByUUID: async function (uuid: string) {
    if (!uuid || uuid.length < 32) {
      return null;
    }
    const user = await UserRepository.getByUUID(uuid);
    return Promise.resolve(user);
  },
};
