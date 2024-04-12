import { useEffect, useState } from 'react'

import Orders from '../components/Orders'
import { Container } from '../library'
import { UserHeader, Footer, CartTotal } from '../components'

import logic from '../logic'

export default function MyOrders(props) {
    console.log('MyOrders')

    const [orders, setOrders] = useState([])

    useEffect(() => {
        refreshOrders()
    }, [])

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
        <>
            <Container align="center">
                <UserHeader />
                <h2 className='flex p-3 justify-center bg-[skyblue] m-3 rounded-3xl'>YOUR ORDERS</h2>

                <div className=''>
                    <Orders orders={orders} onError={props.onError} />
                </div>
                <CartTotal />
                <Footer />
            </Container>
        </>
    )
}