import Cart from "../models/cartModel.js";


export const getToCart = (req, res) => {
    res.json({ msg: "helllo" })
}

export const addItemToCart = async (req, res) => {
    // try {
    //     const { cartItems } = req.body;

    //     if (!cartItems)
    //         return res.status(400).json({ message: "No cart item!" });

    //     const userID = await Cart.findOne({ user: req.user._id })
    //     if (userID) return res.status(400).json({ msg: "Shop cart already exists" });


    //     const newCartItem = new Cart({
    //         user: req.user._id,
    //         cartItems: cartItems,
    //     });

    //     newCartItem.save((error, cart) => {
    //         if (error) return res.status(400).json({ error });
    //         if (cart) {
    //             res.status(201).json({ newCartItem });
    //         }
    //     });

    // } catch (error) {
    //     return res.status(500).json({ success: false, message: 'Internal server error' });
    // }

    const { cartItems } = req.body;
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(404).json({ error });
        if (cart) {
            const isCartItemAdded = cart.cartItems.find((c) => c.product == cartItems.product);
            let condition, update;

            if (isCartItemAdded) {
                // neu da co gio hang thi nhanh chong cap nhat by quantity
                condition = { user: req.user._id, "cartItems.product": cartItems.product };
                update = {
                    "$set": {
                        "cartItems.$": {
                            ...cartItems,
                            quantity: isCartItemAdded.quantity + cartItems.quantity,
                        },
                    }
                };
                // Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": cartItems.product }, {
                //     "$set": {
                //         "cartItems.$": {
                //             ...cartItems,
                //             quantity: isCartItemAdded.quantity + cartItems.quantity,
                //         },
                //     }
                // }, { new: true }).exec((error, _cart) => {
                //     if (error) return res.status(400).json({ error });
                //     if (_cart) {
                //         res.status(201).json({ cart: _cart });
                //     }
                // });
            } else {
                condition = { user: req.user._id };
                update = {
                    "$push": {
                        "cartItems": [cartItems],
                    }
                };
                // Cart.findOneAndUpdate({ user: req.user._id }, {
                //     "$push": {
                //         "cartItems": [cartItems],
                //     }
                // }, { new: true }).exec((error, _cart) => {
                //     if (error) return res.status(400).json({ error });
                //     if (_cart) {
                //         res.status(201).json({ cart: _cart });
                //     }
                // });
                // totalItemCartAdded({ user: req.user._id }, cartItems, res);
            }
            Cart.findOneAndUpdate(condition, update, { new: true }).exec((error, _cart) => {
                if (error) return res.status(400).json({ error });
                if (_cart) {
                    res.status(201).json({ cart: _cart });
                }
            });
            // return res.status(200).json({ message: 'Shop cart already exists', cart: cart });
        } else {
            // if cart not exist the create a newcart
            const newCartItem = new Cart({
                user: req.user._id,
                cartItems: cartItems,
            });
            newCartItem.save((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) {
                    res.status(201).json({ newCartItem });
                }
            });
        }
    });
}
// const totalItemCartAdded = (itemId, cartItems, res) => {
//     Cart.findOneAndUpdate(itemId, {
//         "$push": {
//             "cartItems": [cartItems],
//         }
//     }, { new: true }).exec((error, _cart) => {
//         if (error) return res.status(400).json({ error });
//         if (_cart) {
//             res.status(201).json({ cart: _cart });
//         }
//     });
// }