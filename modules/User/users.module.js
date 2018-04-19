const User = require('../../models/user.model');
const errors = require('restify-errors');
const DatabaseModule = require('../Common/database.module');

module.exports = {
    api: {
        get: getUsers,
        show: getUser,
        create: createUser,
        update: updateUser,
        destroy: deleteUser
    }
};

/**
 * Get all the users from Databas
 * @param {object} request 
 * @param {object} response 
 * @param {object} next 
 */
function getUsers(request, response, next) {

    var allowedPopulates = [];

    var users = DatabaseModule.buildQuery(request.params, User, 'user_id', allowedPopulates);

    users = users.then(function (results) {

        response.send(results);

        next();

    });

}


/**
 * Get User from Database
 * @param {object} request 
 * @param {function} response 
 * @param {object} next 
 */
function getUser(request, response, next) {

    var allowedPopulates = [];

    var user = DatabaseModule.buildQuery(request.params, User, 'user_id', allowedPopulates);

    user.then(function (userDocument) {

        if (!userDocument) {

            return next(new errors.InternalError('record not found.'));

        }

        response.send(userDocument);

        next();

    });

}

/**
 * Create a user
 * @param {object} request 
 * @param {object} response 
 * @param {object} next 
 */
function createUser(request, response, next) {

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

/**
 * Update User Information
 * @param {object} request 
 * @param {function} response 
 * @param {object} next 
 */
function updateUser(request, response, next) {
    if (!request.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    let data = request.body || {};

    if (!data._id) {
        data = Object.assign({}, data, {
            _id: request.params.user_id
        });
    }
    var query = User.findByIdAndUpdate(data._id, data, {
        new: true
    });


    query = query.then(function (document) {
        response.send(document);
        next();
    });

    // query = query.exec(function (exception, user) {
    //     if (exception) {

    //         return next(
    //             new errors.InvalidContentError(exception.message)
    //         );

    //     } else if (!user) {
    //         return next(
    //             new errors.ResourceNotFoundError(
    //                 'The resource you requested could not be found.'
    //             )
    //         );
    //     }

    //     response.send(data);
    //     next();
    // });
}

/**
 * Delete User from Database
 * @param {object} request 
 * @param {function} response 
 * @param {object} next 
 */
function deleteUser(request, response, next) {

    User.findByIdAndRemove(request.params.user_id)
        .exec(function (exception, user) {
            if (exception) {

                return next(
                    new errors.InvalidContentError(exception.message)
                );

            } else if (!user) {
                return next(
                    new errors.ResourceNotFoundError(
                        'The resource you requested could not be found.'
                    )
                );
            }

            response.send(user);
            next();
        });
}