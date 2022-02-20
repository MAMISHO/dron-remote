import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
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
    resolve: () => {
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
      /*return [
        {
          id: 0,
          name: 'world',
          type: 'DRON',
          email: 'world',
        },
        {
          id: -1,
          name: 'world-1',
          type: 'DRON',
          email: 'world-1',
        },
      ];*/
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
    resolve(root, params, options) {
      /*const data = { ...params.data };
      if (!employees) {
        employees = [];
      }
      data.id = employees.length + 1;
      employees.push(data);
      return data;*/
      return {
        id: 1,
        name: 'testDron',
        type: 'DRON',
        email: 'test@example.com',
      };
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
