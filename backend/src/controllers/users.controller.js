const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      profilePicture,
      password,
    } = req.body;

    // Validate required fields
    if (!name || !email || !address || !phone || !password) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Validate address fields
    const {
      houseNo,
      street,
      city,
      state,
      country,
      pincode,
    } = address;

    if (!houseNo || !street || !city || !state || !country || !pincode) {
      return res.status(400).json({
        message: "Complete address is required",
      });
    }

    // Check whether email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      address,
      phone,
      profilePicture,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Return safe data
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
        profilePicture: newUser.profilePicture,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try{
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({
              message: "Email and password are required",
          });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({
              message: "Invalid email or password",
          });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);  
      if (!isPasswordValid) {
          return res.status(401).json({
              message: "Invalid email or password",
          });
      } 
      const token = jwt.sign(
          {
              id: user._id, 
              role: user.role,
          },
          process.env.JWT_SECRET,
          {
              expiresIn: "30d",
          }
      );
      res.status(200).json({
          message: "Login successful",
          token,
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              phone: user.phone,
              profilePicture: user.profilePicture,
              role: user.role,
              createdAt: user.createdAt,
          },
      });
  }catch (error) {
    console.error("Login user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, address, phone, profilePicture } = req.body;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (name) user.name = name;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    return res.status(200).json({
      message: "User profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the current password",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword
};