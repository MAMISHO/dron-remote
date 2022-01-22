const { shield, rule, and, inputRule, deny } = require('graphql-shield');
const { _authenticate, _authorize } = require('./auth');

const shieldRules = {
  isAuthenticated: rule()(async (parent, args, ctx, info) => {
    // return !!ctx.req.headers['user-id'];
    console.log('authenticate');
    let userAuth = false;
    if (ctx.user === undefined) {
      var result = await _authenticate(ctx);
      if (result !== undefined && result.errors === undefined) {
        userAuth = true;
      }
    } else {
      userAuth = true;
    }
    return userAuth;
  }),

  isAdmin: rule()(async (parent, args, ctx, info) => {
    if (!ctx.user) {
      return false;
    }
    // const user = users.find(({ id }) => id === ctx.req.headers['user-id']);

    return ctx.user.isRoleAdmin;
  }),

  isNotAlreadyRegistered: inputRule()((yup) =>
    yup.object({
      input: yup.object({
        name: yup.string().required(),
        email: yup
          .string()
          .email()
          .required()
          .notOneOf(
            users.map(({ email }) => email),
            'A user exists with this email. Choose another.'
          ),
      }),
    })
  ),
};

/*
const permissions = shield({
  Query: {
    '*': deny,
    // getBooks: and(shieldRules.isAuthenticated, shieldRules.isAdmin),
    // getBook: shieldRules.isAuthenticated,
    hello: and(shieldRules.isAuthenticated, shieldRules.isAdmin),
    bye: shieldRules.isAuthenticated,
  },
  Mutation: {
    // addBook: shieldRules.isNotAlreadyRegistered,
    addEmployee: shieldRules.isNotAlreadyRegistered,
  },
});
*/

const permissions = shield({
  DeviceQueries: {
    '*': deny,
    getDevices: and(shieldRules.isAuthenticated, shieldRules.isAdmin),
    getDevice: shieldRules.isAuthenticated,
  },
  DeviceMutations: {
    // addBook: shieldRules.isNotAlreadyRegistered,
    addDevice: shieldRules.isNotAlreadyRegistered,
  },
});

module.exports.permissions = permissions;
