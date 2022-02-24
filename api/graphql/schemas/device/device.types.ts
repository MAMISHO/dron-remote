import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UserType } from '../user/user.types';

export const DeviceTypeEnumType = new GraphQLEnumType({
  name: 'DeviceTypeEnum',
  values: {
    DRON: {
      value: 'DRON',
    },
    OTHER: {
      value: 'OTHER',
    },
  },
});

export const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    id: { type: GraphQLInt },
    uuid: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
    owner: { type: UserType },
  }),
});

export const DeviceInputType = new GraphQLInputObjectType({
  name: 'DeviceInput',
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    ownerUuid: { type: GraphQLString },
  }),
});
