import React from 'react'
import { Container } from '../library'

function Order(props) {
    console.log('Order')

    const order = props.order

    return (
        <>
<Container align='center'>
<h1>YOUR ORDER</h1>

<article className=" flex p-[.5rem] hover:bg-[skyblue]">
    <p>Status: <p>{order.statusOrder}</p></p>
    <p>Buyer: <p>{order.buyer}</p></p>
    <p>Payment: <p>{order.payment}</p></p>
    <p>Products: <p>{order.products}</p></p>
    <p>Date: <p>{order.date}</p></p>

</article>
</Container>
            
        </>
    )
}

export default Order