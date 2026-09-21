import jwt from 'jsonwebtoken';

const generateToken = (user) =>
  jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'farmers-side-demo-secret',
    { expiresIn: '7d' },
  );

export default generateToken;
