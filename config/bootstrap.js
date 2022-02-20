/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const { graphqlHTTP } = require('express-graphql');
/*
const {
  schemaWithPermissions,
} = require('../api/graphql/schemas/device/DeviceSchema');
*/
/*
const {
  schemaWithPermissions,
} = require('../api/graphql/schemas/user/user.schema');
*/
import { schemaWithPermissions } from '../api/graphql/schemas/schema';
const queryTest = `
query {
  getUser {
      ... on User {
          id,
          name,
          email,
          role,
          devices {
           ... on Device {
              id,
              name,
              type
              }
          }
      }
  }
}
`;

module.exports.bootstrap = async function (done) {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  sails.hooks.http.app.use(
    '/graphql',
    graphqlHTTP((req, res) => ({
      schema: schemaWithPermissions,
      context: { req },
      graphiql: {
        defaultQuery: queryTest,
        headerEditorEnabled: true,
      },
    }))
  );
  return done();
};
