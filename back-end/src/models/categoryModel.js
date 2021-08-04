import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    categoryImage: { type: String },
    parentId: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
},
    { timestamps: true }
);

const Categories = mongoose.model('Categories', CategorySchema);
export default Categories;