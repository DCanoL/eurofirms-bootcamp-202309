import React from 'react'
import { CartItems, UserHeader, Footer, CartTotal } from '../components'
import { Container, Button } from '../library'
import { useCartContext } from '../components/CartContext'
import logic from '../logic'

const Cart = (props) => {

    const products = useCartContext()

    function handleCheckOutClick() {
        try {
            logic.createOrder((error) => {
                if (error) {
                    props.onError(error)

                    return
                }
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
                    <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Carrito Vacio" />
                </>
            )}

            <Footer />
        </Container>
    )
}

export default Cart