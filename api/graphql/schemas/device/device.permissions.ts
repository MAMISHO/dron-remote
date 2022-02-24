import { and } from 'graphql-shield';
import { ShieldRules } from '../../policies/schema.shield.rules';

export const DevicePermissions = {
  queries: {
    getDevices: and(ShieldRules.isAuthenticated, ShieldRules.isAdmin),
    getDevice: ShieldRules.isAuthenticated,
  },
  mutations: {
    // addDevice: ShieldRules.isNotAlreadyRegistered,
    addDevice: and(ShieldRules.isAuthenticated),
  },
};
