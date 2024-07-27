import { registerUser } from "../services/User.js";

const register_controller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await registerUser({ name, email, password });
    res.status(201).json({
      success: true,
      data: result,
      message: "User Created"
    });
  } catch (error) {
    console.error('Error in register_controller:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Registration failed"
    });
  }
};

export default register_controller;
