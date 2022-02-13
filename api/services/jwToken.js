/**
 * Service to generate JWT
 * para implementar el refresh token podemos seguir el
 * tutorial:
 * https://www.izertis.com/es/-/blog/refresh-token-con-autenticacion-jwt-implementacion-en-node-js
 */
var jwt = require('jsonwebtoken');

module.exports = {
  sign: function (payload) {
    return jwt.sign(
      {
        data: payload,
      },
      sails.config.jwtConfig.secret,
      { expiresIn: sails.config.jwtConfig.expiresIn }
    );
  },
  verify: function (token, callback) {
    jwt.verify(token, sails.config.secret, callback);
  },
  verifySync: function (token) {
    return jwt.verify(token, sails.config.secret);
  },
};
