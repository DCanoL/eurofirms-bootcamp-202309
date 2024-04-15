const { validate } = require('./helpers')

const { User } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function retrieveUser(userId, callback) {
    validate.text(userId, 'user id')
    
    validate.function(callback, 'callback')

    User.findById(userId).select('-_id -email -password -cartItems -__v').lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            callback(null, user)
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = retrieveUser