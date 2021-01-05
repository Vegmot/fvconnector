import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
  // get token from header
  const token = req.header('x-auth-token');

  // check if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token; authorisation denied' });
  }

  // verify token
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: 'Invalid token' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error('Something has gone wrong with auth middleware');
    res.status(500).json({ msg: 'Server error' });
  }
};

/* const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorised as admin');
  }
}; */

export { auth };
