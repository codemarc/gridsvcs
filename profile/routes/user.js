const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

// Register a new user
router.post('/register', async (req, res) => {
   const { username, password, email } = req.body
   try {
      let user = await User.findOne({ username })
      if (user) return res.status(400).json({ msg: 'User already exists' })

      user = new User({ username, password, email })
      await user.save()

      const payload = { user: { id: user.id } }
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
         if (err) throw err
         res.json({ token })
      })
   } catch (err) {
      res.status(500).send('Server error')
   }
})

// Login a user
router.post('/login', async (req, res) => {
   console.dir(req.body)
   const { username, password } = req.body
   try {
      let user = await User.findOne({ username })
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

      const payload = { user: { id: user.id } }
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
         if (err) throw err
         res.json({ token })
      })
   } catch (err) {
      res.status(500).send('Server error')
   }
})

// Get user profile
router.get('/profile', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
   } catch (err) {
      res.status(500).send('Server error')
   }
})

// Update user profile
router.put('/profile', auth, async (req, res) => {
   const { firstName, lastName, bio } = req.body
   try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(404).json({ msg: 'User not found' })

      user.profile = { firstName, lastName, bio }
      await user.save()
      res.json(user)
   } catch (err) {
      res.status(500).send('Server error')
   }
})

module.exports = router