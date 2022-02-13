/**
 * auth.js
 *
 * A simple policy that
 *  a) establishes identity of a user based on a jwt token
 *  b) allow access to resources based on role-based ACL
 *
 */

const { checkPermission } = require('./permission');

module.exports = {
  _authenticate: async (context) => {
    console.log('pasa por el authenticate');
    let req = context.req;
    let token;
    token = await sails.helpers.recoverToken(req).intercept((err) => {
      return {
        errors: [{ code: err.code, message: err.message }],
      };
    });

    let result = await sails.helpers
      .verifyToken(token, req)
      .intercept((err) => {
        return {
          errors: [{ code: err.code, message: err.message }],
        };
      });
    if (!result) {
      return {
        errors: [
          {
            code: 'E_DECODE',
            message: message,
          },
        ],
      };
    }

    // Set the user object in graphql object for reference in subsequent processing
    context.user = result;
    return result;
  }, // end _authenticate()

  _authorize: async (user, expectedScope) => {
    console.log('pasa por el authorization');
    let isAllowed = false;

    const scopeSplit = expectedScope.toLowerCase().split(':');
    const resource = scopeSplit[0].trim();
    const permission = scopeSplit[1].trim();
    if (scopeSplit.length > 2) {
      if (scopeSplit[2] === 'admin') {
        if (user.isRoleAdmin) {
          isAllowed = await checkPermission(user.roleId, permission, resource);
        }
      }
    } else {
      isAllowed = await checkPermission(user.roleId, permission, resource);
    }

    if (!isAllowed) {
      sails.log.info('auth._authorize: Access denied for: ');
      sails.log.info('  User:', user.fullName, '(' + user.emailAddress + ')');
      sails.log.info('  Valid Resource:Scope is: ', expectedScope);
    }
    return isAllowed;
  }, // end _authorize()
  // "processId": "${command:PickProcess}",
};
