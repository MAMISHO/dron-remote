import { Device } from 'api/interfaces';
import { DeviceRepository } from '../../repository/device/device.repository';

export const DeviceHelper = {
  _getDevicesByUser: async function (userId: number): Promise<Device[]> {
    if (!userId) {
      return [];
    }
    return DeviceRepository.getDevicesByUser(userId);
  },

  _getDeviceById: async function (id: number): Promise<Device> {
    if (!id) {
      return null;
    }
    return DeviceRepository.get(id);
  },

  _getDeviceByUUID: async function (uuid: string) {
    if (!uuid || uuid.length < 32) {
      return null;
    }
    const device = await DeviceRepository.getByUUID(uuid);
    return Promise.resolve(device);
  },
};
