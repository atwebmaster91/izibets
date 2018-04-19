const MODULE_ID = 'api:hello';

module.exports = (req, res, next) => {
    console.info('%s: request received', MODULE_ID);

    res.send({
        ping: 'OK'
    });

    console.info('%s: response sent', MODULE_ID);
    return next();
}