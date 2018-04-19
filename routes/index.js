/**
 * Module Dependencies
 */
const errors = require('restify-errors');

module.exports = (server) => {

  // unprotected routes
  require("./ping")(server)
  require("./Authentication/authentication.routes.v1")(server);

  // protected routes
  require("./User/user.routes.v1")(server);

};