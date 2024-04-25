import React from 'react';
import { Container, Button } from '../library';

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
                                <th className="p-2">Status</th>
                                <th className="p-2">Buyer</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="text-sm text-black-700 text-center bg-gray-200 border">
                                <td className="p-2">{order.statusOrder}</td>
                                <td className="p-2">{order.buyer}</td>
                                <td className="p-2">{order.date = new Date().toLocaleDateString()}</td>
                                <td className="p-2">{order.totalPrice} €</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className=" shadow-md rounded mt-2">
                        {order.products.map((p) => (

                            <div className="flex mb-2  p-5 flex-row border-black-400 shadow-md rounded bg-blue-100 border" key={p.id}>

                                <div>

                                    <img src={`${p.img}`} alt={`${p.name}`} width="100px"
                                        height="100px" />

                                </div>

                                <div className='m-5'>

                                    <p>{p.name}</p>
                                    <p>Price: {p.price} €</p>

                                </div>

                            </div>
                        ))}
                    </div>

                    <Button>BUY</Button>
                </div>
            </Container>
        </>
    );
}

export default Order;