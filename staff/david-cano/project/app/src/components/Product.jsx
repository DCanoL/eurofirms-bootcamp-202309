import Button from '../library/Button'
import { useLocation } from 'react-router-dom'
import logic from '../logic'
import CartItemQuantity from './CartItemQuantity'
import React, { useState } from 'react'

export default function Product(props) {
    console.log('Product')

    const product = props.product
    const location = useLocation()
    const isHomeOrDashboard = location.pathname === '/' || location.pathname === '/dashboard'
    const [quantity, setQuantity] = useState(product.quantity)

    function handleAddCart() {
        console.log('Product Add Cart')

        try {
            logic.addCartItem(product.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }
                props.onCartAdd()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleDeleteClick() {
        const confirmed = confirm('Are you sure do you want to delete the product?')

        if (confirmed)
            try {
                logic.deleteProduct(product.id, error => {
                    if (error) {
                        props.onError(error)

                        return
                    }

                    props.onDeleted()
                })
            } catch (error) {
                props.onError(error)
            }
    }

    const isInCart = product.cartItem

    console.log(product)

    return <article className="flex flex-col p-[.5rem] hover:bg-[skyblue]">
        <p>{product.name}</p>
        <img className="max-w-[300px]" src={product.img} />
                {isHomeOrDashboard && <details>
                <summary>Product Description</summary>
                <p>{product.description}</p>
            </details>}
        {isInCart ? <p>Price: {product.price * product.quantity} €</p> : <p>Price: {product.price } €</p>}

        <div>
        {isInCart && !isHomeOrDashboard ? < CartItemQuantity quantity = {quantity} setQuantity={setQuantity} />: null}

            {product.author.id === logic.getLoggedInUserId() ? 
            <Button title="Delete" aria-label="Delete" onClick={handleDeleteClick}>Delete ❌</Button> : <Button onClick={handleAddCart} isRemove={isInCart}>{isInCart ? 'Remove 🛍️' : 'Add 🛍️'}</Button>}
        </div>
    </article>
}