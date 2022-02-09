module.exports = {
  friendlyName: 'Recover Token',
  description: 'Retrieve token from request',
  inputs: {
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

    noUsersFound: {
      description:
        'Could not find any users who logged in during the specified time frame.',
    },

    noAutHeader: {
      description: 'No Authorization header was found',
    },

    badBearerTokenFormat: {
      description: 'Format is Authorization: Bearer [token]',
    },
  },

  fn: async function (inputs, exits) {
    let token: string;
    const req = inputs.req;
    if (req.headers && req.headers.authorization) {
      //authorization header is present
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0];
        var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        throw 'badBearerTokenFormat';
      }
    } else {
      //authorization header is not present
      throw 'noAutHeader';
    }
    // return Promise.resolve(token);
    return exits.success(token);
  },
};
