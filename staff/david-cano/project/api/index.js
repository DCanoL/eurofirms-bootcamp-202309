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
    addCartItemHandler
} = require('./handlers')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/users', cors, jsonBodyParser, registerUserHandler)

        api.get('/users', retrieveUserHandler)

        api.post('/products', jsonBodyParser, createProductHandler)

        api.delete('/products/:productId', deleteProductHandler)

        api.get('/products', retrieveProductsHandler)

        api.get('/products/cartItems', retrieveCartItemsHandler)

        api.patch('/products/:productId/cartItems', addCartItemHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
    })