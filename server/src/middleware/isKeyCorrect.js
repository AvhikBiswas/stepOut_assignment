import jwt from "jsonwebtoken";

const adminApiKey = process.env.ADMIN_KEY;

const isAdmin = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = await jwt.verify(token, SECRET);
      req.Admin = "Power Admin";
      next();
    } catch (error) {
      res.status(403).json({ error: "Forbidden", success: false });
    }
  } else {
    res.status(403).json({ error: "No token found", success: false });
  }
};
export default isAdmin;
