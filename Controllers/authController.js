import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// REGISTER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      adharNo,
      role,
      password,
      confirmPassword,
      departmentName,
      location,
    } = req.body;

    console.log("Req body:",req.body);

    // console.log("Location from frontend:", location);

    // This is the file uploaded by multer (already on Cloudinary)

    const profilePic = req.file ? req.file : null;

    console.log("Prof pic",profilePic)

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:",hashedPassword);

    console.log("Req.body:",req.body)

    // Cloudinary URL already set by multer
    const profilePictureUrl = profilePic?.path || "";

    const newUser = await User.create({
      firstName,
      lastName,
      phone,
      adharNo,
      role,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      departmentName: role === "departmenthead" ? departmentName : null,
      profilePicture: profilePictureUrl,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    // console.log("Location from frontend:", location);
    console.log("NewUser:",newUser);

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    console.log("User :",user)

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, role: user.role, departmentName: user.departmentName },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );


    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
