import { and } from 'graphql-shield';
// const { ShieldRules } = require('../../policies/schema.shield.rules');
import { ShieldRules } from '../../policies/schema.shield.rules';

/*
const permissions = shield({
  DeviceQueries: {
    '*': deny,
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  DeviceMutations: {
    addDevice: ShieldRules.isNotAlreadyRegistered,
  },
});
*/

// module.exports.DevicePermissions = permissions;
/*
module.exports.DevicePermissions = {
  DeviceQueries: {
    '*': deny,
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  DeviceMutations: {
    addDevice: ShieldRules.isNotAlreadyRegistered,
  },
};
*/
/*
module.exports.DevicePermissions = {
  Query: {
    '*': deny,
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  Mutation: {
    addDevice: ShieldRules.isNotAlreadyRegistered,
  },
};
*/

export const DevicePermissions = {
  queries: {
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  mutations: {
    // addDevice: ShieldRules.isNotAlreadyRegistered,
    addDevice: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
  },
};

// module.exports.DevicePermissions = DevicePermissions;
