import { useEffect, useState } from 'react'

import Orders from '../components/Orders'

import logic from '../logic'

export default function AllOrdersUser(props) {
    console.log('AllOrdersUser')

    const [orders, setOrders] = useState([])

    useEffect(() => {
        refreshOrders()
    }, [props.timestamp])

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
        <Orders orders={orders} onError={props.onError} />
    )
}