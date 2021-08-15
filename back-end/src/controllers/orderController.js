import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Address from '../models/addressModel.js';

export const addOrder = async (req, res) => {
    try {
        await Cart.deleteOne({ user: req.user._id })
            .exec((error, result) => {
                if (error) return res.status(400).json({ error });
                if (result) {
                    req.body.user = req.user._id;
                    req.body.orderStatus = [
                        {
                            type: "ordered",
                            date: new Date(),
                            isCompleted: true,
                        },
                        {
                            type: "packed",
                            isCompleted: false,
                        },
                        {
                            type: "shipped",
                            isCompleted: false,
                        },
                        {
                            type: "delivered",
                            isCompleted: false,
                        },
                    ];
                    const newOrder = new Order(req.body);
                    newOrder.save((error, order) => {
                        if (error) return res.status(400).json({ error });
                        if (order) {
                            res.status(201).json({ order: newOrder });
                        }
                    });
                }
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// export const getOrders = async (req, res) => {
//     try {
//         await Order.find({ user: req.user._id })
//             .select('_id paymentStatus items')
//             .populate("items.productId", "_id name productPictures")
//             .exec((error, orders) => {
//                 if (error) return res.status(400).json({ error: error, message: "Find not order!" });
//                 if (orders) return res.status(200).json({ orders });
//             });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };


//Viet theo kieu Promise
export const getOrders = async (req, res) => {
    try {
        const getOrdersUser = async () => {
            const data = await Order.find({ user: req.user._id })
                .select('_id paymentStatus items')
                .populate("items.productId", "_id name productPictures")
            // .exec((error, orders) => {
            //     if (error) return res.status(400).json({ error: error, message: "Find not order!" });
            //     if (orders) return orders;
            // })
            return data;
        }
        getOrdersUser()
            .then(orders => res.status(200).json({ orders }))
            .catch(error => console.log(error))
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findOne({ _id: orderId })
            .populate("items.productId", "_id name productPictures")
            .lean() //quyen the chap- cho phep tra ve 1 doi tuong js  nối giữa 2 object order và address
            .exec((error, order) => {
                if (error) return res.status(400).json({ error });
                if (order) {
                    Address.findOne({ user: req.user._id })
                        .exec((error, address) => {
                            if (error) return res.status(400).json({ error });
                            order.address = address.address.find( // lien ket duoc dua vao lean()
                                (adr) => adr._id.toString() == order.addressId.toString()
                            );
                            res.status(200).json({ order });
                        });
                }
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};