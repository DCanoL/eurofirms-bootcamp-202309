const jwt = require('jsonwebtoken')

const logic = require('../logic/indexLogic')
const { ContentError, NotFoundError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        logic.retrieveUser(userId, (error, user) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(user)
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