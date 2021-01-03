import express from 'express';
import connectDB from './config/db.js';
import usersRoute from './routes/api/users.js';
import postsRoute from './routes/api/posts.js';
import authRoute from './routes/api/auth.js';
import profileRoute from './routes/api/profile.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

// connect to database
connectDB();

// initialise middleware
app.use(express.json({ extended: false })); // bodyParser

// Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);

const __dirname = path.resolve();

// serve statis assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`|| Server running on port ${PORT} ||`));
