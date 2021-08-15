import Cart from "../models/cartModel.js";

const runUpdate = (condition, updateData) => {
    new Promise((resolve, reject) => {
        resolve("UpdateCart: true -", updateData);
        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then((result) => resolve())
            .catch((err) => reject(err));
    });
};

export const getToCart = (req, res) => {
    try {
        Cart.findOne({ user: req.user._id })
            .populate('cartItems.product', '_id name price productPictures') //lấy được thông tin sp dựa vào khóa ngoại id của product
            .exec((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) {
                    let cartItems = {};
                    cart.cartItems.forEach((item, index) => {
                        cartItems[item.product._id.toString()] = {
                            _id: item.product._id.toString(),
                            name: item.product.name,
                            image: item.product.productPictures[0].image,
                            price: item.product.price,
                            qty: item.quantity,
                        };
                    });
                    res.status(200).json({ success: true, cartItems });
                }
            });

        // .exec((error, cartItems) => {
        //     if (error) return res.status(400).json({ error });
        //     if (cartItems) {
        //         res.status(200).json({ success: true, cartItems });
        //     }
        // });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const removeCartItems = async (req, res) => {
    try {
        const { productId } = req.body;

        if (productId) {
            await Cart.updateOne(
                { user: req.user._id },
                {
                    $pull: {
                        cartItems: {
                            product: productId,
                        },
                    },
                }
            ).exec((error, result) => {
                if (error) return res.status(400).json({ error });
                if (result) {
                    res.status(202).json({ result });
                    console.log(result)
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
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
            let promiseArray = [];

            cartItems.forEach((cartItem) => {
                // const isCartItemAdded = cart.cartItems.find((c) => c.product == cartItems.product); //CÁCH CŨ
                const isCartItemAdded = cart.cartItems.find((c) => c.product == cartItem.product);
                let condition, update;
                // neu da co gio hang thi nhanh chong cap nhat by quantity
                if (isCartItemAdded) {
                    // condition = { user: req.user._id, "cartItems.product": cartItems.product };
                    condition = { user: req.user._id, "cartItems.product": cartItem.product };
                    update = {
                        "$set": {
                            "cartItems.$": cartItem,

                            // CÁCH CŨ
                            // "cartItems.$": {
                            //     ...cartItems,
                            //     quantity: isCartItemAdded.quantity + cartItems.quantity,
                            // },
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
                        "$push": { cartItems: cartItem }
                        // CÁCH CŨ
                        // "$push": {
                        //     "cartItems": [cartItems],
                        // }
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
                }
                //Cách mới
                promiseArray.push(runUpdate(condition, update));
                // console.log(promiseArray);
                //Cách cũ
                // Cart.findOneAndUpdate(condition, update, { new: true }).exec((error, _cart) => {
                //     if (error) return res.status(400).json({ error });
                //     if (_cart) {
                //         res.status(201).json({ cart: _cart });
                //     }
                // });
            });
            Promise.all(promiseArray)
                .then((response) => res.status(201).json({ response }))
                .catch((error) => res.status(400).json({ error }));
        } else {
            // nếu giỏ hàng không tồn tại thì hãy tạo một giỏ hàng mới
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
