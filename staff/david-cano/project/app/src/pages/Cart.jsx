import React, { useState } from 'react'
import { CartItems, UserHeader, Footer, CartTotal } from '../components'
import { Container, Button } from '../library'
import { useCartContext } from '../components/CartContext'
import logic from '../logic'

const Cart = (props) => {

    // const products = useCartContext()
    const [products, setProducts] = useState([useCartContext()])

    function handleCheckOutClick() {
        //TODO manage payment
        try {
            logic.createOrder((error) => {
                if (error) {
                    props.onError(error)

                    return
                }
                setProducts([])
            })
        } catch (error) {
            props.onError(error)
        }

        props.onCheckOut()

    }

    return (
        <Container align="center">
            <UserHeader onLogout={props.onLogout} />

            {products.length > 0 ? (
                <>
                    <CartItems onCartItemAdd={props.onCartItemAdd} onError={props.onError} />

                    <CartTotal onError={props.onError} />

                    <Button onClick={handleCheckOutClick}>
                        Check Out
                    </Button>
                </>
            ) : (
                <>
                    <h2>¡¡¡ Your Cart is EMPTY !!!</h2>
                    <h2>Please, GO TO THE SHOOPING</h2>
                </>
            )}

            <Footer />
        </Container>
    )
}

export default Cart