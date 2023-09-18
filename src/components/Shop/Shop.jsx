import { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <h3 className='cart-headding'>Order Summary</h3>
                <p>Selected Items: {cart.length}</p>
                <p>Total Price: ${ }</p>
                <p>Total shopping Charge: ${ }</p>
                <p>Tax: { }</p>
                <h4>Grand Total: { }</h4>
                <button className='btn-red'>Clear Cart
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className='btn-orange'>Review Order
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

        </div>
    );
};

export default Shop;