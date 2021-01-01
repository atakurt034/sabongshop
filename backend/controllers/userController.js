import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import { validationResult } from 'express-validator'

import { Query } from '../utils/userKeywords.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

// @desc    Get user profile
// @route   GET /api/users/login
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.image = req.body.image || user.image
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      image: updateUser.image,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const valError = validationResult(req)
  console.log(valError.array().map((r) => r.param))

  if (!valError.isEmpty()) {
    res.status(422)
    throw new Error(valError.array().map((result) => result.msg))
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        image: user.image,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
  }
})

// @desc    GET all users
// @route   POST /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keywords
  const users = await User.find({ $or: [...Query(keyword)] })
  res.json(users)
})

// @desc    DELETE a user
// @route   Delete /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const users = User.find({ _id: { $in: req.params.id.split(',') } })

  if (users) {
    await User.deleteMany(users)
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    GET users by id
// @route   GET /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   Put /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
