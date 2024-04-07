const mongoose = require('mongoose')

const retrieveMyOrders = require('./retrieveMyOrders')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')

    .then(() => {
        try {
            retrieveMyOrders('65fcc2055566deba0164eb31', (error, orders) => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log(orders)
            })
        } catch (error) {
            console.error(error)
        }
    })