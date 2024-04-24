const { validate } = require('./helpers')

const { User, Product } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function addCartItem(userId, productId, callback) {
    validate.text(userId, 'user id')
    validate.text(productId, 'product id')
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Product.findById(productId)
                .then(product => {
                    if (!product) {
                        callback(new NotFoundError('product not found'))

                        return
                    }

                    const index = user.cartItems.findIndex(productObjectId => productObjectId.toString() === productId)

                    if (index < 0)
                        user.cartItems.push(productId)
                    else
                        user.cartItems.splice(index, 1)
                    
                    user.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = addCartItem