const { shield, rule, and, inputRule, deny } = require('graphql-shield');
const { stitchSchemas } = require('@graphql-tools/stitch');
const { applyMiddleware } = require('graphql-middleware');
const { ShieldRules } = require('../policies/schema.shield.rules');
const { UserSchema } = require('./user/user.schema');
const { DeviceSchema } = require('./device/device.schema');
const { SchemaPermissions } = require('../policies/schema.shield.rules');
const { UserPermissions } = require('../schemas/user/user.permissions');
const { DevicePermissions } = require('../schemas/device/device.permissions');

// setup subschema configurations
const userSchema = { schema: UserSchema };
const deviceSchema = { schema: DeviceSchema };

const schema = stitchSchemas({
  subschemas: [userSchema, deviceSchema],
});

/*const schemaPermissions = shield({
  ...UserPermissions,
  ...DevicePermissions,
});*/
const schemaPermissions = shield({
  Query: {
    '*': deny,
    // getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    // getDevice: ShieldRules.isAuthenticated,
    // getUser: ShieldRules.isAuthenticated,
    ...UserPermissions.queries,
    ...DevicePermissions.queries,
  },
  Mutation: {
    // addDevice: ShieldRules.isNotAlreadyRegistered,
    ...UserPermissions.mutations,
    ...DevicePermissions.mutations,
  },
});

module.exports.schemaWithPermissions = applyMiddleware(
  schema,
  schemaPermissions
);
