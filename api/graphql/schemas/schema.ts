import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import { deny, shield } from 'graphql-shield';
import { DevicePermissions } from './device/device.permissions';
import { DeviceSchema } from './device/device.schema';
import { UserPermissions } from './user/user.permissions';
import { UserSchema } from './user/user.schema';

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
/*
module.exports.schemaWithPermissions = applyMiddleware(
  schema,
  schemaPermissions
);
*/
export const schemaWithPermissions = applyMiddleware(schema, schemaPermissions);
