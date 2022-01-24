const { shield, and, deny } = require('graphql-shield');
const { ShieldRules } = require('../../policies/schema.shield.rules');

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

module.exports.DevicePermissions = {
  queries: {
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  mutations: {
    addDevice: ShieldRules.isNotAlreadyRegistered,
  },
};
