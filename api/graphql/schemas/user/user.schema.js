const { GraphQLSchema, GraphQLObjectType } = require('graphql');
// const { permissions } = require('../../policies/shieldSchema');
const { permissions } = require('../../policies/schema.shield.rules');
const { UserType } = require('./user.types');
const { applyMiddleware } = require('graphql-middleware');

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
};

const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'UserQueries',
    fields: UserQueries,
  }),
});

module.exports.UserSchema = UserSchema;

// module.exports.schemaWithPermissions = applyMiddleware(UserSchema, permissions);
