import React from 'react'
import { Container } from '../library'
import Order from './Order'

export default function Orders(props) {
    console.log('Orders')
    
    return <Container className ='md:grid md:grid-cols-2 lg:grid-cols-3' align="center" aria-label={props['aria-label']}>
        {props.orders.map(function (order) {
                    return <Order key={order.id} order={order} onError={props.onError} />
        })}
    </Container>
}