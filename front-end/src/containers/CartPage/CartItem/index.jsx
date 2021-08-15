import React, { useState } from "react";
import { generatorPublicUrl } from "../../../urlConfig";
import "./styles.css";

/**
 * LE LAM
 */

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);

    const { _id, name, price, image } = props.cartItem;
    // console.log(props.cartItem);

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        props.onQuantityInc(_id);
    };

    const onQuantityDecrement = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);
    };

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={generatorPublicUrl(image)} alt={""} />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>Delivery in 3 - 5 days</div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    margin: "5px 0",
                }}
            >
                {/* quantity control */}
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className="cartActionBtn">save for later</button>
                <button
                    className="cartActionBtn"
                    onClick={() => props.onRemoveCartItem(_id)}
                >
                    Remove
                </button>
            </div>
            <hr />
        </div>
    );
};

export default CartItem;