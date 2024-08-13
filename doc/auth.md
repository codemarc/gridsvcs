# Secured Microservice for User Profile Content

## Step-by-Step Plan

1. **Initialize the Project**:
   - Create a new directory for the microservice.
   - Initialize a new Node.js project with `npm init`.
   - Install necessary dependencies: `express`, `jsonwebtoken`, `bcryptjs`, `mongoose`, and `dotenv`.

2. **Set Up Environment Variables**:
   - Create a `.env` file to store environment variables like the JWT secret and database connection string.

3. **Create the Express Server**:
   - Set up an Express server in `server.js`.

4. **Connect to MongoDB**:
   - Use Mongoose to connect to a MongoDB database.

5. **Define User Model**:
   - Create a Mongoose model for the user profile.

6. **Implement Authentication Middleware**:
   - Create middleware to handle JWT authentication.

7. **Create Routes for User Profile**:
   - Implement routes for creating, reading, updating, and deleting user profiles.

8. **Secure the Routes**:
   - Use the authentication middleware to secure the routes.

## Code Implementation

### 1. Initialize the Project
```sh
mkdir user-profile-service
cd user-profile-service
npm init -y
npm install express jsonwebtoken bcryptjs mongoose dotenv

### 2. Set Up Environment Variables
touch .env

PORT=3000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string

### 3. Create the Express Server
touch server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

### 4. Define User Model
touch models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile: {
    firstName: String,
    lastName: String,
    bio: String
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);

### 5. Implement Authentication Middleware
touch middlewares/auth.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

### 6. Create Routes for User Profile
touch routes/user.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password, email });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.profile = { firstName, lastName, bio };
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

### 7. Secure the Routes
Modify server.js to include the user routes and authentication middleware.

const userRoutes = require('./routes/user');

app.use('/api/users', userRoutes);

### 8. Start the Server
Start the server with:

node server.js

This setup includes user registration, login, and profile management with JWT-based authentication.

