declare var sails: any;
import { DeviceRequest } from '../interfaces';
import { DeviceRepository } from '../repository/device/device.repository';

/*
export async function findOne(req: any, res: any) {
  const params = req.allParams();
  const deviceRequest: DeviceRequest = params;
  const result = await DeviceRepository.findOne(deviceRequest);
  res.send(result);
}
*/
module.exports = {
  /**
   * Obtiene un dispositico filtrado por uno de sus identificadores
   * únicos. Si la respuesta tiene más de dos resultados, se devuelve un error
   * @param req Request
   * @param res Response
   */
  findOne: async (req: any, res: any) => {
    const params = req.allParams();
    const deviceRequest: DeviceRequest = params;
    const result = await DeviceRepository.findOne(deviceRequest);
    res.send(result);
  },

  /**
   * Obtiene una colección de dispositivos a partir del filtro que
   * lleguen en los parámetros. En el caso de que no se indique un
   * filtro se devuelve el conjunto de dispositivos que tenga el
   * usuario de la sesión
   * @param req Request
   * @param res Response
   */
  findAll: async (req: any, res: any) => {
    const params = req.allParams();
    const deviceRequest: DeviceRequest = params;
    if (req.session && req.session.user) {
      deviceRequest.userId = req.session.user.id;
    }
    const result = await DeviceRepository.findAll(deviceRequest);
    res.send(result);
  },
};
