import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
  }),
});

export const DeviceInputType = new GraphQLInputObjectType({
  name: 'DeviceInput',
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
