import { loginUser } from "../services/User.js";

const Login_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('email,password', email,password);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        success: false,
      });
    }

    const token = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Error in Login_controller:', error);
    return res.status(500).json({
      success: false,
      error: error.message || "Login failed",
    });
  }
};

export default Login_controller;
