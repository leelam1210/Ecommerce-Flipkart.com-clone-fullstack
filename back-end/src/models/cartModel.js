import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
        }
    ]
},
    { timestamps: true, }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;