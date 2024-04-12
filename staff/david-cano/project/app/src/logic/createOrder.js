import { validate } from './helpers'
import context from './context'
import errors, { SystemError } from './errors'

function createOrder(callback) {
    validate.function(callback, 'callback')
    // Crear un array de IDs de productos a partir de los productos obtenidos del carrito

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${context.storage.token}`,
        }
    }
    // Hacer la llamada para crear la orden con los productos del carrito
    fetch(`${import.meta.env.VITE_API_URL}/orders`, req)
        .then(res => {
            if (!res.ok) {
                // Manejar errores de la respuesta HTTP
                res.json()
                    .then(body => {
                        const constructor = errors[body.error]
                        callback(new constructor(body.message))
                    })
                    .catch(error => callback(new SystemError(error.message)))
                return
            }
            // Si la respuesta es exitosa, ejecutar el callback sin error
            callback(null)
        })
        .catch(error => {
            // Manejar errores de red u otros errores
            console.error('Error creating order:', error)
            callback(new SystemError(error.message))
        })
}

export default createOrder