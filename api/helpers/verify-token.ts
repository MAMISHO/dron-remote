declare const jwToken: any;
import { UserRepository } from '../repository/user/user.repository';

module.exports = {
  friendlyName: 'Verify Token',
  description: 'Verify Token if is valid and not expired',
  inputs: {
    token: {
      friendlyName: 'Bearer Token',
      description: 'Token substract from brearer authorization',
      type: 'string',
    },
    req: {
      friendlyName: 'Request',
      description: 'Request description',
      type: 'ref',
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Recent users',
      outputDescription: 'An array of users who recently logged in.',
    },

    invalidUser: {
      description: 'Invalid user',
    },

    invalidToken: {
      description: 'Invalid token',
    },

    badBearerTokenFormat: {
      description: 'Format is Authorization: Bearer [token]',
    },
  },

  fn: async function (inputs, exits) {
    const token = inputs.token;
    const req = inputs.req;
    let decoded;
    try {
      decoded = await jwToken.verifySync(token);
    } catch (err) {
      req.session.destroy();
      return exits.invalidToken();
    }
    const decodedUser = decoded.data;
    if (!decodedUser) {
      // return res.json(401, { err: 'Invalid user' });
      return exits.invalidUser();
    }
    if (!req.session.user || req.session.user.uuid !== decodedUser.uuid) {
      // const user = await User.findOne({ uuid: decodedUser.uuid });
      const user = await UserRepository.getByUUID(decodedUser.uuid);
      if (user && user.status) {
        req.session.user = user;
      } else {
        req.session.destroy();
        // return res.json(401, { err: 'Invalid user' });
        return exits.invalidUser();
      }
    }
    return exits.success(req.session.user);
  },
};
