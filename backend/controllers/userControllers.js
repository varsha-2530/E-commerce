import sendEmail from "../config/sendEmail.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/genertedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

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
      html: verifyEmailTemplate({ username, url: verifyEmailUrl }),
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password.",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered.",
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Account is not active. Please contact the administrator.",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userid = req.userId;
    console.log("Logging out user:", req.userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // Clear cookies
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    // Remove refresh token from DB
    await User.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successfully!",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    // ✅ Pehle upload karo Cloudinary pe
    const upload = await uploadImageClodinary(image);

    // ✅ Phir user document update karo
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: upload.url,
      },
      { new: true } // optional: to return updated user
    );

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    console.log("Upload Avatar Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const EditUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email, password, phone } = req.body;

    let hashedPassword; // ✅ Declare it here

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.updateOne(
      { _id: userId },
      {
        ...(username && { username }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(password && { password: hashedPassword }),
      }
    );

    return res.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something wrong",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("BODY:", req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime,
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from MinimalMart",
      html: forgotPasswordTemplate({
        username: user.username,
        otp: otp,
      }),
    });

    return res.json({
      message: "Check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    //console.log("BODY :", req.body);

    const user = await User.findOne({ email });

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required field email, otp.",
        error: true,
        success: false,
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString()

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid otp",
        error: true,
        success: false,
      });
    }

    //   const updateUser = await User.findByIdAndUpdate(user?._id,{
    //     forgot_password_otp : "",
    //     forgot_password_expiry : ""
    // })

    return res.json({
      message: "Verify otp successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "provide required fields email, newPassword, confirmPassword",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same.",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const update = await User.findOneAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.json({
      message: "Password updated successfully.",
      error: false,
      success: true,
    });

    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
