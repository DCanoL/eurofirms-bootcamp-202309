import { validate } from './helpers'
import context from './context'
import errors, { SystemError } from './errors'

function createOrder(callback) {
    validate.function(callback, 'callback')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${context.storage.token}`,
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/orders`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => {
                        const constructor = errors[body.error]
                        callback(new constructor(body.message))
                    })
                    .catch(error => callback(new SystemError(error.message)))
                return
            }
            
            callback(null)
        })
        .catch(error => {
            console.error('Error creating order:', error)
            callback(new SystemError(error.message))
        })
}

export default createOrder