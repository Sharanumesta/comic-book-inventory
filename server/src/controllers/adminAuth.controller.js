import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

// Register admin
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Enter all credentials" });
    }

    email = email.toLowerCase();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const user = await Admin.create({ username, email, password });
    const token = await user.generateToken();
    return res
      .status(201)
      .json({ message: "Admin created successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientToken = req.headers.authorization?.split(" ")[1];

    if (clientToken) {
      try {
        const decoded = jwt.verify(clientToken, process.env.TOKEN_SECRET);
        const admin = await Admin.findOne(
          { _id: decoded._id },
          { username: 1, _id: 0 }
        );

        if (admin) {
          return res
            .status(200)
            .json({ message: "Token is valid", username: admin.username });
        } else {
          return res.status(401).json({ message: "Invalid token" });
        }
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all credentials" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await admin.generateToken();
    return res.status(200).json({ token, username: admin.username });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, register };
