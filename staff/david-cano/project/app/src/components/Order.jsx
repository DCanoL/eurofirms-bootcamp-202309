import React from 'react';
import { Container } from '../library';
import CartTotal from './CartTotal';

function Order(props) {
    console.log('Order');

    const order = props.order;

    return (
        <>
            <Container align='center'>
                <h1>YOUR ORDER</h1>
                <div className=" shadow-md rounded mt-2">
                    <table className="w-full border border-separate border-red-400 shadow-md rounded">
                        <thead>
                            <tr className="text-sm font-medium text-red-400 bg-blue-400 border">
                                <th className="p-2">Products</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Buyer</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="text-sm text-black-700 text-center bg-gray-200 border">
                                <td className="p-2">{order.products.map(product => (
                                        <div key={product._id}>
                                            <div>{product.name}</div>
                                            <div><img src={product.img} alt={product.name} /></div>
                                            <div>{product.price}</div>
                                        </div>
                                    ))}</td>
                                <td className="p-2">{order.statusOrder}</td>
                                <td className="p-2">{order.buyer}</td>
                                <td className="p-2">{order.date}</td>
                                <td className="p-2"><CartTotal /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </>
    );
}

export default Order;