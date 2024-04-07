const mongoose = require('mongoose')
const createOrder = require('./createOrder')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')
    .then(() => {
        try {
            createOrder('65fcc2055566deba0164eb31', ['65ca2d533f6c4520f8be0b4c', '65dd97017331694d723cd0fc', '65bb7782b94165eb37cca02c'], 'Success', 'David', 'Sent', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('Created Order')
            })
        } catch (error) {
            console.error(error)
        }
    })