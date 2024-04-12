
const mongoose = require('mongoose')

const retrieveProductsForUser = require('./retrieveProductsForUser')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')
    .then(() => {
        try {
            retrieveProductsForUser('65fcc2055566deba0164eb31', (error, products) => {
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