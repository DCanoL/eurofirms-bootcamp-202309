import { useEffect, useState } from 'react'
import Orders from '../components/Orders'
import { Container } from '../library'
import { UserHeader, Footer } from '../components'

import logic from '../logic'

export default function MyOrders(props) {
    console.log('MyOrders')

    const [orders, setOrders] = useState([])

    useEffect(() => {
        refreshOrders()
    }, [orders])

    function refreshOrders() {
        try {
            logic.retrieveMyOrders((error, orders) => {
                if (error) {
                    props.onError(error)

                    return
                }

                setOrders(orders)
            })
        } catch (error) {
            props.onError(error)
        }
    }

    return (
            <Container align="center">
                <UserHeader onLogout={props.onLogout}  />
                <h2 className='flex p-3 justify-center bg-[skyblue] m-3 rounded-3xl'>YOUR ORDERS</h2>

                {orders.length > 0 ? (
                <>
                    <div>
                    <Orders orders={orders} onError={props.onError} />
                    </div>
                </>
            ) : (
                <>
                    <h2>¡¡¡ Your ORDERS is EMPTY !!!</h2>
                    <h2>Please, GO TO THE SHOOPING</h2>
                    <img src="https://cdn.dribbble.com/users/3470232/screenshots/7776749/media/765a02ab1105385f24105903262e14a0.gif" alt="Orden Vacía" width='550px' height='550px' className='rounded-3xl m-5' />
                </>
                )}
                <Footer />
            </Container>
    )
}