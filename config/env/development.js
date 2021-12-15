/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  // JWT secret
  /**
   * expiresIn: expressed in seconds or a string describing a time span vercel/ms.
    Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
    If you use a string be sure you provide the time units (days, hours, etc),
    otherwise milliseconds unit is used by default ("120" is equal to "120ms").
   */
  secret: 'mysecret',
  jwtConfig: {
    secret: 'mysecret',
    expiresIn: '1d'
  }
};
