import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Cart = (props) => {
    const cart = props.cart; //option 1
    // const {cart} = props; //option 2

    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h3 className='cart-headding'>Order Summary</h3>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total shopping Charge: ${totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h4>Grand Total: {grandTotal.toFixed(2)}</h4>
            <button className='btn-red'>Clear Cart
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button className='btn-orange'>Review Order
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
};

export default Cart;