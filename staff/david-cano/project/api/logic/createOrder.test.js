const mongoose = require('mongoose')
const createOrder = require('./createOrder')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')
    .then(() => {
        try {
            createOrder('65fcc2055566deba0164eb31', error => {
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