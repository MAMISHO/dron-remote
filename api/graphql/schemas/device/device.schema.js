const { applyMiddleware } = require('graphql-middleware');
const { permissions } = require('../../policies/schema.shield.rules');
const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const { DeviceType, DeviceInputType } = require('./device.types');

const DeviceQueries = {
  getDevice: {
    type: DeviceType,
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
    type: DeviceType,
    resolve: () => 'Bye wold',
  },
};

const DeviceMutations = {
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

const DeviceSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'DeviceQueries',
    fields: DeviceQueries,
  }),
  mutation: new GraphQLObjectType({
    name: 'DeviceMutations',
    fields: DeviceMutations,
  }),
});

module.exports.DeviceSchema = DeviceSchema;

/*
module.exports.schemaWithPermissions = applyMiddleware(
  DeviceSchema,
  permissions
);*/
