import Users from '../models/userModel.js';

export const authAdmin = async (req, res, next) => {
    try {
        // Get admin information by id
        const user = await Users.findOne({
            _id: req.user.id
        });
        if (user.role !== "admin")
            return res.status(400).json({ message: "Admin resources access denied" });

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
        console.log(error);
    }
}

export const userPermission = async (req, res, next) => {
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        });
        if (user.role !== "user")
            return res.status(400).json({ message: "User resources access denied" });

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
        console.log(error);
    }
}

