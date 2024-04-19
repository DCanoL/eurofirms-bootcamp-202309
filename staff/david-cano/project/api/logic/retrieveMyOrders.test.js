const mongoose = require('mongoose')

const retrieveMyOrders = require('./retrieveMyOrders')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')

    .then(() => {
        try {
            retrieveMyOrders('661c9af38f266b6e56ea9716', (error, orders) => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log(orders[0].products)
            })
        } catch (error) {
            console.error(error)
        }
    })