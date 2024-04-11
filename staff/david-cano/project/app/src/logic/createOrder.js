import { validate } from './helpers'
import context from './context'
import errors, { SystemError } from './errors'
import retrieveCartItems from './retrieveCartItems'

function createOrder(productsIds, payment, statusOrder, callback) {
    validate.array(productsIds, 'products ids')
    validate.text(payment, 'payment')
    validate.text(statusOrder, 'status order')
    validate.function(callback, 'callback')
    // Llamar a la función para obtener los productos del carrito
    retrieveCartItems((error, products) => {
        if (error) {
            // Manejar errores al obtener los productos del carrito
            console.error('Error retrieving cart items:', error)
            callback(error)
            return
        }

        // Crear un array de IDs de productos a partir de los productos obtenidos del carrito
        const productsIds = products.map(product => product.id)

        const req = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${context.storage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productsIds,
                payment,
                statusOrder,
                buyer,
                date: new Date().toISOString() // Agregando la propiedad date
            })
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
    })
}

export default createOrder
