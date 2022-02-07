const { GraphQLSchema, GraphQLObjectType, GraphQLInt } = require('graphql');
// const { permissions } = require('../../policies/shieldSchema');
const { permissions } = require('../../policies/schema.shield.rules');
const { UserType } = require('./user.types');
const { applyMiddleware } = require('graphql-middleware');
import { GraphQLString } from 'graphql';
import { UserHelper } from '../../helpers/user.helper';
/*
const UserQueries = {
  getUser: {
    type: UserType,
    resolve: () => {
      return {
        id: 1,
        name: 'edwin',
        surname: 'Quishpe',
        role: 'ADMIN',
        email: 'test@example.com',
        devices: [
          {
            id: 1,
            name: 'Bender',
            type: 'DRON',
            email: 'test@example.com',
          },
          {
            id: 2,
            name: 'R2D2',
            type: 'DRON',
            email: 'test2@example.com',
          },
        ],
      };
    },
  },
};*/

const UserQueries = {
  getUser: {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
      uuid: { type: GraphQLString },
    },
    resolve: (root, params, options) => {
      if (!params) {
        return null;
      }
      if (params.id) {
        return UserHelper._getUserById(params.id);
      }
      if (params.uuid) {
        return UserHelper._getUserByUUID(params.uuid);
      }
    },
  },
};

const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'UserQueries',
    fields: UserQueries,
  }),
});

module.exports.UserSchema = UserSchema;

// module.exports.schemaWithPermissions = applyMiddleware(UserSchema, permissions);
