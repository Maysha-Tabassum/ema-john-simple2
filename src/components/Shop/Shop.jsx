import { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1: get id of the added product
        for (const id in storedCart) {
            //step 2: get product from state by using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                //step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4: add the added product to the savedcart
                savedCart.push(addedProduct);

            }
            // console.log('added product', addedProduct)
        }
        //step 5: set the cart
        setCart(savedCart);
    }, [products])


    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
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
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to="/order">
                        <button className='btn-orange'>Review Order
                            <FontAwesomeIcon className='icon-spacing' icon={faArrowRight} />
                        </button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;