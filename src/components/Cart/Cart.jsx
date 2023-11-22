import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart, handleClearCart, children }) => {
    // const cart = props.cart; //option 1
    // const {cart} = props; //option 2

    //console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        // if (product.quantity === 0) {
        //     product.quantity = 1;
        // }
        // product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h3 className='cart-headding'>Order Summary</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total shopping Charge: ${totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h4>Grand Total: {grandTotal.toFixed(2)}</h4>
            <div>
                <button onClick={handleClearCart} className='btn-red'>Clear Cart
                    <FontAwesomeIcon className='icon-spacing' icon={faTrashCan} />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Cart;