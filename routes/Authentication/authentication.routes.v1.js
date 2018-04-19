const config = require("../../config");
const AuthenticationModule = require("../../modules/Authentication/authentication.module");

module.exports = (server) => {
    var PATH = config.basePath("/auth");

    server.post({
        path: PATH + '/token',
        version: '1.0.0'
    }, AuthenticationModule.api.getToken);

    server.post({
        path: PATH + '/signup',
        version: '1.0.0',
    }, AuthenticationModule.api.signup);

}