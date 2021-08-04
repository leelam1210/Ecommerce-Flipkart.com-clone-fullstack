import jwt from 'jsonwebtoken';
import Users from '../models/userModel.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(400).json({ message: "Invalid Authentication." });
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

        if (!decoded) return res.status(400).json({ message: "Invalid Authentication." });
        // console.log(decoded);
        const user = await Users.findOne({ _id: decoded.id });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        req.user = user;
        // req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // if (req.headers.authorization) {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     req.user = user;
    // } else {
    //     return res.status(400).json({ message: "Authorization required" });
    // }
    // next();
}


export default auth;

