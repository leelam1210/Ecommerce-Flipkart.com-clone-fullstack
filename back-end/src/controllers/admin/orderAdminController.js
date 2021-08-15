import Order from '../../models/orderModel.js';

export const updateOrder = async (req, res) => {
    try {
        const { orderId, type } = req.body;
        if (!orderId || !type) return res.status(400).json({ message: "Not request required" });
        await Order.updateOne({ _id: orderId, "orderStatus.type": type }, {
            $set: {
                "orderStatus.$": [
                    { type: type, date: new Date(), isCompleted: true },
                ],
            },
        }).exec((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
                res.status(201).json({ order });
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.productId", "name quantity productId")
            .exec((error, orders) => {
                if (error) return res.status(400).json({ error: error, message: "Find not order!" });
                if (orders) return res.status(200).json({ orders })
            });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};