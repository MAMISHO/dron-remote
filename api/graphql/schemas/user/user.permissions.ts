import { ShieldRules } from '../../policies/schema.shield.rules';

export const UserPermissions = {
  queries: {
    //'*': deny,
    getUser: ShieldRules.isAuthenticated,
    // getUser: allow,
  },
  mutations: {},
};
