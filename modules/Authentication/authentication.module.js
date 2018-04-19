const User = require("../../models/user.model");
const errors = require("restify-errors");
const config = require("../../config");
var jwt = require("jsonwebtoken");

/**
 * Get Auth JWT token
 * @param {object} request 
 * @param {object} response 
 * @param {object} next 
 */
function getAuthUserToken(request, response, next) {
    let authResponse = {};

    if (!request.is("application/json")) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let credentials = request.body || {};

    if (!credentials.email) {

        return next(new errors.BadRequestError("No email provided."));

    }

    if (!credentials.password) {

        return next(new errors.BadRequestError("No password provided."));

    }

    User.findOne({
        "email": credentials.email
    }).exec(function (exception, user) {
        if (exception) {

            return next(new errors.InternalError(exception.message));

        } else if (!user) {
            return next(
                new errors.ResourceNotFoundError(
                    'User not found.'
                )
            );
        }

        var token = null;
        // console.log('user found: ', user);
        user.comparePassword(credentials.password, function (error, isMatch) {
            if (error) {
                return next(
                    new errors.ResourceNotFoundError(
                        'Invalid credentials.'
                    )
                );
            }

            if (isMatch) {
                token = jwt.sign(user.toObject(), config.JWT_SECRET);
                // console.log('AUTH USER', user, token);

            }

            response.send({
                token: token
            });

            return next();

        });

    });

}

function signup(request, response, next) {
    if (!request.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = request.body || {};
    let user = new User(data);

    user.save(function (exception) {

        if (exception) {

            return next(new errors.InternalError(exception.message));

        }

        response.send(user);

        next();

    });
}

module.exports = {
    api: {
        getToken: getAuthUserToken,
        signup: signup
    }
};