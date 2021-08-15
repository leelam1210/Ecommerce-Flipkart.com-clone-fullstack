import UserAddress from '../models/addressModel.js';

export const addAddress = async (req, res) => {
    //return res.status(200).json({body: req.body})
    // {new: true} tra lai dia chi chi da tao moi
    // upsert: true cho phep tao 1  truong moi neu kh ton tai
    try {
        const { address } = req.body;

        if (address) {
            await UserAddress.findOneAndUpdate({ user: req.user._id }, {
                "$push": {
                    "address": address,
                }
            }, { new: true, upsert: true })
                .exec((error, address) => {
                    if (error) return res.status(400).json({ error });
                    if (address) return res.status(200).json({ success: true, address: address });
                });
        } else {
            return res.status(400).json({ success: false, message: "Params address required!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getAddress = async (req, res) => {
    try {
        await UserAddress.findOne({ user: req.user._id })
            .exec((error, userAddress) => {
                if (error) return res.status(400).json({ error, message: 'Error!' });
                if (userAddress) {
                    res.status(200).json({ success: true, userAddress });
                }
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

