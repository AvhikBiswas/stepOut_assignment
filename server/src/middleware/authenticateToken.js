import jwt from "../services/node_modules/jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = await jwt.verify(token, SECRET);
      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({ error: "Forbidden", success: false });
    }
  } else {
    res.status(403).json({ error: "No token found", success: false });
  }
};

export default authenticateToken;
