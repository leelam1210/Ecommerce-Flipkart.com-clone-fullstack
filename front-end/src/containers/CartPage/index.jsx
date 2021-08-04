import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import './styles.css';
import { addToCart } from '../../redux/actions';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems]);

    const onQuantityIncrement = (_id, a) => {
        // console.log({ _id, qty });
        // console.log(image);
        const { name, price, image } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, image }, 1));
    };

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, image } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, image }, -1));
    };
    return (
        <Layout>
            <div className="cartContainer">
                <Card
                    headerLeft={`My Cart`}
                    headerRight={`Deliver to`}
                    style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                >
                    {/* <div className="carHeader">
                        <div>My Cart</div>
                        <div>Deliver to</div>
                    </div> */}
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            // onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }
                </Card>
                <Card
                    headerLeft='Price:'
                    style={{
                        width: '500px'
                    }}>
                </Card>
            </div>
        </Layout>
    )
}

export default CartPage
