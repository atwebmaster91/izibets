const API_ROOT = '/api';
module.exports = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4040,
    base_url: process.env.BASE_URL || 'http://ar-sis.dev',
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bets_db',
    },
    // key to generate/verify JWT
    JWT_SECRET: 'some-secret',
    // will be used to building route paths
    basePath: (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    }
};


/**
 * mongo db , Schema columns types:
 * 
 *      String.
        Number.
        Date.
        Buffer.
        Boolean.
        Mixed.
        ObjectId.
        Array.
 * 
 */