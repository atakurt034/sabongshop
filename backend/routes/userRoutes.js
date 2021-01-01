import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import { body } from 'express-validator'
import User from '../models/userModel.js'

const validation = () => {
  return [
    body('name')
      .isLength({ min: 3 })
      .withMessage('Name should be a minimum of 3 characters')
      .isAlpha()
      .withMessage('Name should contain letters only'),
    body('email')
      .isEmail()
      .withMessage('Please Input Valid Email')
      .custom((email) => {
        return User.findOne({ email }).then((user) => {
          if (user) {
            return Promise.reject('User Already Exist')
          }
        })
      })
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one sepcial character'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match')
      }
      return true
    }),
  ]
}

router.route('/').post(validation(), registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
