import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            image: { type: String },
            navigateTo: { type: String }
        }
    ],
    products: [
        {
            image: { type: String },
            navigateTo: { type: String }
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true }
);
const Page = mongoose.model('Page', pageSchema);
export default Page;