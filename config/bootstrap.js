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
import { printSchema } from 'graphql';
import { Schema, SchemaWithPermissions } from '../api/graphql/schemas/schema';
import { prettify } from '../api/services/prettier';
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
      schema: SchemaWithPermissions,
      context: { req },
      graphiql: {
        defaultQuery: queryTest,
        headerEditorEnabled: true,
      },
      pretty: true,
    }))
  );
  sails.hooks.http.app.use('/graphqlsdl', function (req, res, next) {
    const rawSdl = printSchema(Schema, { commentDescriptions: true });
    const sdl = prettify(rawSdl, {
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
    });
    // console.log(sdl);
    res
      .status(200)
      .send(`<textarea name="textarea" rows="50" cols="80">${sdl}</textarea>`);
  });
  return done();
};
