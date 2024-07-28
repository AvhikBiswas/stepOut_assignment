import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;
const adminCredentials = {
  username: 'admin',
  password: 'admin123' //we can store it here or in env or in db also db is prafered
};

// Admin login route
const adminLogin= (req, res) => {
  const { username, password } = req.body;
  console.log('username , password', username , password);

  if (username === adminCredentials.username && password === adminCredentials.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
}
export default adminLogin;