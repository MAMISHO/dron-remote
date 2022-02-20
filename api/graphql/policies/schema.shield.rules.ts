import { rule } from 'graphql-shield';
import { GraphAuth } from './auth';

const shieldRules = {
  isAuthenticated: rule()(async (parent, args, ctx, info) => {
    console.log('authenticate');
    let userAuth = false;
    if (ctx.user === undefined) {
      try {
        var result = await GraphAuth._authenticate(ctx);
        if (result !== undefined && result.errors === undefined) {
          userAuth = true;
        }
      } catch (err) {
        console.error(err);
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

  /*isNotAlreadyRegistered: inputRule()((yup) =>
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
  ),*/
};

export const ShieldRules = shieldRules;
