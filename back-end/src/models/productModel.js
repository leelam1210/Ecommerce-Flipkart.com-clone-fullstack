import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { image: { type: String } }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            reviewContent: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    updatedAt: Date,
},
    { timestamps: true }
);

const Products = mongoose.model('Products', productSchema);
export default Products;