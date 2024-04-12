const { validate } = require('./helpers')
const { User, Order } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function createOrder(userId, callback) {
    validate.text(userId, 'user id')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Order.create({ user: userId, products: user.cartItems, buyer: user.name })
                .then(() => {
                    //TODO clean cartItems from user
                    callback(null)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = createOrder