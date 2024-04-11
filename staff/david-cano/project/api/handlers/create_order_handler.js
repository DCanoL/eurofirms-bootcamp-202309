const jwt = require('jsonwebtoken')

const logic = require('../logic')
const { ContentError, NotFoundError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        const { products, payment, statusOrder } = req.body

        logic.createOrder(userId, products, payment, statusOrder, error => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406
        else if (error instanceof jwt.JsonWebTokenError)
            status = 401

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}