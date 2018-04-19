const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt-nodejs");
const mongoosePaginate = require('mongoose-paginate');
// const bcrypt = null;
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
});


UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, passwordEncrypted);

    function passwordEncrypted(err, salt) {
        console.log(err, salt);
        if (err) return next('Error :::', err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (error, progress) {

        }, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    }
});

/**
 * #model methods
 */
UserSchema.methods = {
    comparePassword: comparePassword
};

/**
 * @method comparing password to authenticate user
 * @param {string} candidatePassword 
 * @param {function} callback 
 */
function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
        if (error) {
            return callback(error);
        }

        callback(null, isMatch);
    });
}

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
UserSchema.plugin(mongoosePaginate);


const User = mongoose.model('User', UserSchema);
module.exports = User;