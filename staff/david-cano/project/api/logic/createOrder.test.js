const mongoose = require('mongoose')
const createOrder = require('./createOrder')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')
    .then(() => {
        try {
            createOrder('661c9af38f266b6e56ea9716', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('Created Order, OK')
            })
        } catch (error) {
            console.error(error)
        }
    })