const {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { DeviceType } = require('../device/device.types');

const UsertRoleEnumType = new GraphQLEnumType({
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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: UsertRoleEnumType },
    status: { type: GraphQLBoolean },
    devices: {
      type: new GraphQLList(DeviceType),
      name: 'devices',
    },
  }),
});

module.exports.UserType = UserType;
// export { UserType };
