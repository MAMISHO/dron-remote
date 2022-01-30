const { shield, deny } = require('graphql-shield');
const { stitchSchemas } = require('@graphql-tools/stitch');
const { applyMiddleware } = require('graphql-middleware');
const { UserSchema } = require('./user/user.schema');
const { DeviceSchema } = require('./device/device.schema');
const { UserPermissions } = require('../schemas/user/user.permissions');
const { DevicePermissions } = require('../schemas/device/device.permissions');

// Configuramos los subschemas
const userSchema = { schema: UserSchema };
const deviceSchema = { schema: DeviceSchema };

// Unimos los subschemas en un schema global
const schema = stitchSchemas({
  subschemas: [userSchema, deviceSchema],
});

/**
 * Importamos todas las reglas de consulta y modificación de cada schema
 */
const schemaPermissions = shield({
  Query: {
    '*': deny,
    ...UserPermissions.queries,
    ...DevicePermissions.queries,
  },
  Mutation: {
    ...UserPermissions.mutations,
    ...DevicePermissions.mutations,
  },
});

// Aplicamos las reglas al schema
module.exports.schemaWithPermissions = applyMiddleware(
  schema,
  schemaPermissions
);
