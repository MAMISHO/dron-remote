import { Device } from 'api/interfaces';
import { UserRepository } from '../../repository/user/user.repository';

export const DeviceHelper = {
  _addDevice: function (device) {},
  _getDeviceById: async function (id: number): Promise<Device> {
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
