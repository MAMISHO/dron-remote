import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { Device, User } from '../../../interfaces';
import { DeviceHelper } from '../../helpers/device.helper';
import { DeviceInputType, DeviceType } from './device.types';

// Pagination https://github.com/graph-gophers/graphql-go/pull/169

export const DeviceQueries = {
  getDevice: {
    type: DeviceType,
    args: {
      id: { type: GraphQLInt },
      uuid: { type: GraphQLString },
    },
    resolve: (root, params, options, info) => {
      return {
        id: 1,
        name: 'testDron',
        type: 'DRON',
        email: 'test@example.com',
      };
    },
  },
  getDevices: {
    type: new GraphQLList(DeviceType),
    name: 'devices',
    resolve: (root, params, options, info) => {
      if (root) {
        params.id = root.id;
        params.uuid = root.uuid;
      }

      if (params.id) {
        return DeviceHelper._getDevicesByUser(params.id);
      }
      return [];
    },
  },
};

export const DeviceMutations = {
  addDevice: {
    type: DeviceType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(DeviceInputType),
      },
    },
    resolve(root, params, options, info) {
      const user: User = new User({ ...options.user });
      if (!params || Object.keys(params).length === 0) {
        // Devolvemos los datos sel usuario de la sesión
        // Devolvemos error
      }
      const data = { ...params.data };
      const device: Device = Object.assign({}, data);
      if (!device.owner) {
        // Lo saca de la sessión
        device.owner = user;
      }

      return device;
      /*return {
        id: 1,
        name: 'testDron',
        type: 'DRON',
        email: 'test@example.com',
      };*/
    },
  },
};

export const DeviceSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'DeviceQueries',
    fields: DeviceQueries,
  }),
  mutation: new GraphQLObjectType({
    name: 'DeviceMutations',
    fields: DeviceMutations,
  }),
});
