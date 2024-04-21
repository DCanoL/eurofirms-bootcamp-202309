const { validate } = require('./helpers')

const { User, Order } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function retrieveMyOrders(userId, callback) {
    validate.text(userId, 'user id')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))

                return
            }

            Order.find({ user: userId }).select('-__v').populate('user', 'name').populate('products', 'name img price').lean()
                .then(orders => {
                    orders.forEach(order => {
                        order.id = order._id.toString()
                        delete order._id

                        if (order.user._id) {
                            order.user.id = order.user._id.toString()
                            delete order.user._id
                        }

                        // if (order.products._id) {
                        //     const products = order.products

                        //     products.forEach(product => {
                        //         product.id = product._id.toString()
                        //         delete product._id
                        //     })
                        // }
                    })

                    callback(null, orders)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
module.exports = retrieveMyOrders