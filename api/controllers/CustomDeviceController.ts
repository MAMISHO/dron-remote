declare var sails: any;

import { DeviceRequest } from '../interfaces';
import { DeviceRepository } from '../repository/device.repository';

/*
export async function findOne(req: any, res: any) {
  const params = req.allParams();
  const deviceRequest: DeviceRequest = params;
  const result = await DeviceRepository.findOne(deviceRequest);
  res.send(result);
}
*/
module.exports = {
  findOne: async (req: any, res: any) => {
    const params = req.allParams();
    const deviceRequest: DeviceRequest = params;
    const result = await DeviceRepository.findOne(deviceRequest);
    res.send(result);
  },
};
