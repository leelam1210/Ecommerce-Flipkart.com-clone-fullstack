import Users from '../models/userModel.js';
import { generateAccessToken } from "../config/generateToken.js";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Simple validation
        if (!email || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Missing username and/or password' });
        // Check for existing user
        const user = await Users.findOne({ email: email });
        if (!user || user.role !== 'user')
            return res
                .status(400)
                .json({ success: false, message: 'User invalid account!' });
        const isMatchPassWord = await bcrypt.compare(password, user.hash_password);
        // const isMatchPassWord = user.authenticate(password);
        if (!isMatchPassWord)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' });

        // Return token
        const accessToken = generateAccessToken({ id: user._id, role: user.role });

        res.json({
            status: "OK",
            message: "Login successfully.",
            data: user,
            accessToken: accessToken,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const signUp = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (!email || !firstName || !lastName || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Please complete all information!' });

        const user = await Users.findOne({ email: email });
        if (user)
            return res
                .status(400)
                .json({ message: "User already exists." });
        const hash_password = await bcrypt.hash(password, 10);

        const newUser = new Users({
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email,
            hash_password,
            username: `${firstName}${lastName}`,
            // role: 'user',
        });
        await newUser.save();

        // Return token
        const accessToken = generateAccessToken({ id: newUser._id });
        // res.cookie("authUser", accessToken, { expiresIn: "1d" });

        res.json({
            status: "OK",
            message: "User register successfully.",
            data: newUser,
            accessToken: accessToken,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const signOut = (req, res) => {
    try {
        res.clearCookie("authUser");
        return res.json({ message: "Logged out!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

