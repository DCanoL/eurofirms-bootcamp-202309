const mongoose = require('mongoose')

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'regular'
    },

    cartItems: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ]
})

const product = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

})

const order = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    // products: [
    //     {
    //         type: ObjectId,
    //         ref: 'Product',
    //     }
    // ],

    products: [
        {
            type: ObjectId,
            ref: 'Product',
        
            name: {
                type: String,
                required: true
            },
            img: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }, 
        }
    ],

    payment: {},

    // buyer: {
    //     type: String,
    //     ref: "User",
    //     required: true
    // },

    statusOrder: {
        type: String,
        default: "Processing",
        enum: ["Processing", "Sent", "Delivered", "Cancel"],
    },

    date: {
        type: Date,
        default: Date.now
    },

    totalPrice: {
        type: Number,
        required: true
    }
})

const User = model("User", user)
const Product = model("Product", product)
const Order = model("Order", order)
module.exports = {
    User,
    Product,
    Order
}