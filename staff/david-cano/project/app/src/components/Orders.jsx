import React from 'react'
import { Container } from '../library'
import Order from './Order'

export default function Orders(props) {
    console.log('Orders')

    return <Container align="center" >
        {props.orders.map(function (order) {
            return <Order key={order.id} order={order} onError={props.onError} />
        })}
    </Container>
}