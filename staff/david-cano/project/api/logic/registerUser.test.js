const mongoose = require('mongoose')

const registerUser = require('./registerUser')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_test')
    .then(() => {
        try {
            registerUser('Admin', 'ad@min.com', '000000000', 'admin', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('Registered user successfully')
            })
        } catch (error) {
            console.error(error)
        }
    }) 