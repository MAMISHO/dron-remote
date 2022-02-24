import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { User } from '../../../interfaces/user.model';
import { UserHelper } from '../../helpers/user.helper';
import { DeviceInputType } from '../device/device.types';
import { UserType } from './user.types';

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

export const UserMutations = {
  addUser: {
    type: UserType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(DeviceInputType),
      },
    },
    resolve: (root, params, options, info) => {
      const data = { ...params.data };
      if (data) {
        return UserHelper._addUser(data);
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
