import { validate } from './helpers'
import context from './context'
import errors, { SystemError } from './errors'

function deleteProduct(productId, callback) {
    validate.text(productId, 'product id')
    validate.function(callback, 'callback')
    validate.jwt(context.jwt)

    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${context.storage.token}`
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => {
                        const constructor = errors[body.error]

                        callback(new constructor(body.message))
                    })

                return
            }

            callback(null)
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default deleteProduct