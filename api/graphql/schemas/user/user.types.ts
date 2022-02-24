import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { DeviceQueries } from '../device/device.schema';

export const UsertRoleEnumType = new GraphQLEnumType({
  name: 'UsertRoleEnum',
  values: {
    ADMIN: {
      value: 'ADMIN',
    },
    USER: {
      value: 'USER',
    },
  },
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    uuid: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: UsertRoleEnumType },
    status: { type: GraphQLBoolean },
    /*devices: {
      type: new GraphQLList(DeviceType),
      name: 'devices',
    },*/
    devices: DeviceQueries.getDevices,
  }),
});
