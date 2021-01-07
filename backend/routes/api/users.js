import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { auth } from '../../middleware/auth.js';
import User from '../../models/User.js';
import normalize from 'normalize-url';
import dotenv from 'dotenv';
dotenv.config();

// POST api/users
// Register a user
// public
router.post(
  '/',
  [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter at least 6 characters for password'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, middleName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // check if the user already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // set user's avatar
      const imageNumber = await User.countDocuments({});
      const avatar = `https://i.pravatar.cc/250?img=${imageNumber}`;

      user = new User({
        firstName:
          firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
        middleName: middleName
          ? middleName.charAt(0).toUpperCase() +
            middleName.slice(1).toLowerCase()
          : '',
        lastName:
          lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// GET api/users
// Get all users
// private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
