const { ShieldRules } = require('../../policies/schema.shield.rules');
const { shield, deny } = require('graphql-shield');

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

module.exports.UserPermissions = {
  queries: {
    //'*': deny,
    getUser: ShieldRules.isAuthenticated,
  },
  mutations: {},
};
