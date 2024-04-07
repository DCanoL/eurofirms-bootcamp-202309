const registerUser = require('./registerUser')
const retrieveUser = require('./retrieveUser')
const authenticateUser = require('./authenticateUser')
const createProduct = require('./createProduct')
const deleteProduct = require('./deleteProduct')
const retrieveProducts = require('./retrieveProducts')
const retrieveCartItems = require('./retrieveCartItems')
const addCartItem = require('./addCartItem')
const retrieveProductsForUser = require('./retrieveProductsForUser')
const updateCartItemQuantity = require ('./updateCartItemQuantity')
const createOrder = require ('./createOrder')
const retrieveMyOrders = require ('./retrieveMyOrders')

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    createProduct,
    deleteProduct,
    retrieveProducts,
    retrieveCartItems,
    addCartItem,
    retrieveProductsForUser,
    updateCartItemQuantity,
    createOrder,
    retrieveMyOrders
}

module.exports = logic