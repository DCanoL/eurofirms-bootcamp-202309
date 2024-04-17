const mongoose = require('mongoose')

const addCartItem = require('./addCartItem')

mongoose.connect('mongodb://127.0.0.1/ecommerce_test')
    .then(() => {
        try {
            addCartItem
            ('661c9af38f266b6e56ea9716', '661f60df6b0303a8478fa90f', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('cart item add')
            })
        } catch (error) {
            console.error(error)
        }
    })