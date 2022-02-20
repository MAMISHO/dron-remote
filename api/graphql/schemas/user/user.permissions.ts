// const { ShieldRules } = require('../../policies/schema.shield.rules');
import { ShieldRules } from '../../policies/schema.shield.rules';
// import { shield, deny, allow } from 'graphql-shield';

/*
const permissions = shield({
  UserQueries: {
    '*': deny,
    getUser: ShieldRules.isAuthenticated,
  },
});
*/
/*module.exports.UserPermissions = {
  UserQueries: {
    '*': deny,
    getUser: ShieldRules.isAuthenticated,
  },
};*/

/*module.exports.UserPermissions = {
  Query: {
    // '*': deny,
    getUser: ShieldRules.isAuthenticated,
  },
};*/

export const UserPermissions = {
  queries: {
    //'*': deny,
    getUser: ShieldRules.isAuthenticated,
    // getUser: allow,
  },
  mutations: {},
};

// module.exports.UserPermissions = UserPermissions;
