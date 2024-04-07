const { validate } = require('./helpers')
const { User, Order } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function createOrder(userId, productsIds, payment, buyer, status, callback) {
    validate.text(userId, 'user id')
    validate.array(productsIds, 'products ids')
    validate.text(payment, 'payment')
    validate.text(buyer, 'buyer')
    validate.text(status, 'status')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            // const buyerName = user.name;

            Order.create({ user:userId, products:productsIds, payment, buyer, status })
            .then(() => callback(null))
            .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = createOrder