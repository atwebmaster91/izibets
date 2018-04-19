/**
 * Module Dependencies
 */
const config = require("./config");
const restify = require("restify");
const mongoose = require("mongoose");
const restifyPlugins = require("restify-plugins");
const jwt = require("restify-jwt-community");

/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    version: config.version,
});

// Auth
var jwtConfig = {
    secret: config.JWT_SECRET
};

// secure all routes. except /the following
// server.use(jwt(jwtConfig).unless({
//     path: [
//         config.basePath("/auth/token"),
//         config.basePath("/auth/create-account"),
//         config.basePath("/ping"),
//         config.basePath('/integrations/maplewood')
//     ]
// }));

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({
    mapParams: true
}));

server.use(restifyPlugins.acceptParser(server.acceptable));

server.use(restifyPlugins.queryParser({
    mapParams: true
}));

server.use(restifyPlugins.fullResponse());

/**
 * Start Server, Connect to DB & Require Routes
 */
server.listen(config.port, () => {
    // establish connection to mongodb
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.uri, {});

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error({
            error: err
        });
        process.exit(1);
    });

    db.once("open", () => {
        require("./routes")(server);
        console.log(`Integration Server is listening on port ${config.port}`);
    });
});

module.exports = server;