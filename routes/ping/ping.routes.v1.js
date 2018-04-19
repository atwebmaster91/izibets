const MODULE_ID = 'api:hello';

module.exports = (req, res, next) => {

    res.send({
        ping: 'Server Active'
    });

    return next();
}