import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import './styles.css';
import { addToCart, getCartItems, removeCartItem } from '../../redux/actions';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from "../../components/PriceDetails";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getCartItems());
        }
    }, [isAuthenticated]);

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

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };

    if (props.onlyCartItems) {
        return (
            <>
                {Object.keys(cartItems).map((key, index) => (
                    <CartItem
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                ))}
            </>
        );
    }


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
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() => props.history.push(`/checkout`)}
                            />
                        </div>
                    </div>
                </Card>

                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce((qty, key) => {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CartPage
