const config = require('../../config');
const UsersModule = require('../../modules/User/users.module');

// just to demo a route with multiple versions
module.exports = (server) => {

    var PATH = config.basePath('/users');
    server.get({
        path: PATH,
        version: '1.0.0'
    }, UsersModule.api.get);

    server.get({
        path: PATH + '/:user_id',
        version: '1.0.0',
    }, UsersModule.api.show);

    server.post({
        path: PATH,
        version: '1.0.0'
    }, UsersModule.api.create);

    server.put({
        path: PATH + '/:user_id',
        version: '1.0.0'
    }, UsersModule.api.update);

    server.del({
        path: PATH + '/:user_id',
        version: '1.0.0'
    }, UsersModule.api.destroy);
}