import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { User } from '../../../interfaces/user.model';
import { UserHelper } from '../../helpers/user.helper';
// const { permissions } = require('../../policies/shieldSchema');
// import { permissions } from '../../policies/schema.shield.rules';
import { UserType } from './user.types';
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

export const UserQueries = {
  getUser: {
    type: UserType,
    name: 'user',
    args: {
      id: { type: GraphQLInt },
      uuid: { type: GraphQLString },
    },
    resolve: (root, params, options, info) => {
      // A este punto llega solo si se ha autenticado
      const user: User = new User({ ...options.user });
      const isAdmin = user.isAdmin();

      if (!params || Object.keys(params).length === 0) {
        // Devolvemos los datos sel usuario de la sesión
        return UserHelper._getUserByUUID(user.uuid);
      }
      if (params.id && isAdmin) {
        return UserHelper._getUserById(params.id);
      }
      if (params.uuid && isAdmin) {
        return UserHelper._getUserByUUID(params.uuid);
      }
      return null;
    },
  },
};

export const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'UserQueries',
    fields: UserQueries,
  }),
});

// module.exports.UserSchema = UserSchema;
// module.exports.UserQueries = UserQueries;

// module.exports.schemaWithPermissions = applyMiddleware(UserSchema, permissions);
