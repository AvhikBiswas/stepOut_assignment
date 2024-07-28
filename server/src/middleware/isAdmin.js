import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET; 
console.log('SECRET', SECRET)

const isAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log('Token:', token);
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: "Forbidden", success: false });
      }
      req.Admin = "Power Admin";
      next();
    });
  } else {
    res.status(403).json({ error: "No token found", success: false });
  }
};

export default isAdmin;
