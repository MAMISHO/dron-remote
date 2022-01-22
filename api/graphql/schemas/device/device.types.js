const {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const DeviceTypeEnumType = new GraphQLEnumType({
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

const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
  }),
});

const DeviceInputType = new GraphQLInputObjectType({
  name: 'DeviceInput',
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: DeviceTypeEnumType },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// export { DeviceType, DeviceInputType };
module.exports.DeviceType = DeviceType;
module.exports.DeviceInputType = DeviceInputType;
