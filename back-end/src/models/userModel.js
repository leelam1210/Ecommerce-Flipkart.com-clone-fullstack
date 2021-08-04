import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
},
    { timestamps: true }
);

// UserSchema.virtual('password')
//     .set(function (password) {
//         this.hash_password = bcrypt.hashSync(password, 10);
//     });

// UserSchema.virtual("fullName").get(function () {
//     return `${this.firstName} ${this.lastName}`;
// });

UserSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    },
};

const Users = mongoose.model('Users', UserSchema);
export default Users;