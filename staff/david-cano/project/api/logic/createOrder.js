const { validate } = require('./helpers')
const { User, Order } = require('../data/models')
const { NotFoundError, SystemError } = require('./errors')

function createOrder(userId, callback) {
    validate.text(userId, 'user id')
    validate.function(callback, 'callback')

    User.findById(userId)
        .populate('cartItems')
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }
            const buyerName = user.name
            // const products = user.cartItems.map(item => ({
            //     name: item.name,
            //     img: item.img,
            //     price: item.price,
            //     quantity: 1  // Para ajustar la cantidad según sea necesario
            // }))

            const products = user.cartItems.map(item => item.id)

            const totalPrice = user.cartItems.reduce((total, item) => total + parseFloat(item.price), 0)

            Order.create({ user: userId, products: products, buyer: buyerName, totalPrice: totalPrice })
            .then(() => {
                // Limpiar cartItems del usuario
                user.cartItems = []
                return user.save()
            })
                .then(() => {
                    callback(null)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = createOrder