/**
 * `tasks/config/sync`
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/sync.js
 *
 */
module.exports = function (grunt) {
  grunt.config.set('shell', {
    default: {
      command: ['node app.js'].join('&&'),
    },
  });

  grunt.loadNpmTasks('grunt-shell');
};
