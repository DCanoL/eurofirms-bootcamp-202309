require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { cors } = require('./utils')

const {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    createProductHandler,
    deleteProductHandler,
    retrieveProductsHandler,
    retrieveCartItemsHandler,
    addCartItemHandler,
    retrieveProductsForUserHandler,
    updateCartItemQuantityHandler,
    createOrderHandler,
    retrieveMyOrdersHandler
} = require('./handlers')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors)

        api.post('/users', cors, jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.get('/products/forUser', retrieveProductsForUserHandler)

        api.post('/products', jsonBodyParser, createProductHandler)

        api.get('/products', retrieveProductsHandler)

        api.delete('/products/:productId', deleteProductHandler)

        api.get('/products/cartItems', retrieveCartItemsHandler)

        api.patch('/products/:productId/cartItems', addCartItemHandler)

        api.patch('/products/forUser/:productId/quantity', jsonBodyParser, updateCartItemQuantityHandler)

        api.post('/orders', jsonBodyParser, createOrderHandler)

        api.get('/orders/mine', retrieveMyOrdersHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
    })