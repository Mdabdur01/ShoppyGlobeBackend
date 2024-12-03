import User from "../Model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

// ------------- Creating new user -------------
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // --------------- Check if the user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        // --------------- Hashing the password before storing it into the Data base.
        const hashPassword = await bcrypt.hash(password, 10)

        // --------------- Create new user 
        const newUser = new User({ name, email, password: hashPassword })
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser })
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error :', error: error.message })
    }
}

// ------------- Verify User -------------
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // --------------- Check if the user exists ---------------
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // --------------- Check if the password matches ---------------
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // --------------- Generate JWT token ---------------
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // --------------- Token will expires in 1 hour 

        return res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
