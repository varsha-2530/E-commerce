import sendEmail from "../config/sendEmail.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export const SignUpUser = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // Validate required fields
    if (!username || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password, phone) are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User is already registered.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user payload
    const payload = {
      username,
      email,
      password: hashedPassword,
      phone,
    };

    // Save user
    const newUser = new User(payload);
    const savedUser = await newUser.save();

    // Generate verification URL
const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;
//console.log("Verification URL:", verifyEmailUrl);


    // Send verification email
    await sendEmail({
      sendTo: email,
      subject: "Verify your email from MinimalMart",
      html: verifyEmailTemplate({ username, url: verifyEmailUrl }) 
    });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Verification email sent.",
      data: savedUser,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

 
export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required.",
      });
    }

    const user = await User.findById(code);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    if (user.verify_email) {
      return res.status(200).json({
        success: true,
        message: "Email already verified.",
      });
    }

    user.verify_email = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};