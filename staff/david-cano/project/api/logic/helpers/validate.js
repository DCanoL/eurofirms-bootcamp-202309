const { isValidObjectId } = require('mongoose')
const { ContentError } = require('../errors')

const validate = {
    text(text, explain) {
        if (typeof text !== 'string') throw new TypeError(explain + ' is not a string')
        if (text.trim().length === 0) throw new ContentError(explain + ' is empty string')
    },

    email(email, explain) {
        this.text(email, explain)

        if (!email.includes('@')) throw new ContentError(explain + ' is not a valid email')
        if (!email.includes('.')) throw new ContentError(explain + ' is not a valid email')
    },

    password(password, explain) {
        this.text(password, explain)

        if (password.length < 8) throw new RangeError(explain + ' length is lower than 8 password')
    },

    url(url, explain) {
        this.text(url, explain)

        if (!url.startsWith('http')) throw new ContentError(explain + ' is not a valid url')
    },

    number(number, explain) {
        if (typeof number !== 'number') throw new TypeError(explain + ' is not a number')
    },

    function(func, explain) {
        if (typeof func !== 'function') throw new TypeError(explain + ' is not a function')
    },

    id(id, explain) {
        if (!isValidObjectId(id)) throw new TypeError(explain + ' is not a valid id')
    },

    array(array, explain) {
        if (!Array.isArray(array)) throw new TypeError(explain + ' is not an array');
        if (array.length === 0) throw new ContentError(explain + ' is an empty array');
    }
}


module.exports = validate