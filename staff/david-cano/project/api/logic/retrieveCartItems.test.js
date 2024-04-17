const mongoose = require('mongoose')

const retrieveCartItems = require('./retrieveCartItems')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')

    .then(() => {
        try {
            retrieveCartItems
            //id de usuario
            ('661c9af38f266b6e56ea9716', (error, products) => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log(products)
            })
        } catch (error) {
            console.error(error)
        }
    })