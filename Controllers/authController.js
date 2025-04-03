import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password, role, phone_no, departmentName } = req.body;
        const profilePic = req.file; // Profile picture file

        // Check if the user already exists
        const { data: existingUser, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = null;

        // Upload profile picture if provided
        if (profilePic) {
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from("profile_pictures") // Make sure you created a bucket in Supabase storage
                .upload(`profiles/${Date.now()}_${profilePic.originalname}`, profilePic.buffer, {
                    contentType: profilePic.mimetype
                });

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                return res.status(500).json({ message: "Error uploading profile picture" });
            }

            // Get the uploaded file URL
            profilePicUrl = `https://xyz.supabase.co/storage/v1/object/public/profile_pictures/${uploadData.path}`;
        }

        // Insert user data into Supabase
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    phone_number: phone_no,
                    department_name: role === "departmenthead" ? departmentName : null,
                    profile_picture: profilePicUrl
                }
            ]);

        if (error) {
            return res.status(400).json(error);
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.json({ 
        token, 
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    
};
