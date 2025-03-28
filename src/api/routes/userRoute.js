import express from 'express'
const userRoutes = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

userRoutes.route('/').post(registerUser).get(protect, admin, getUsers)
userRoutes.post('/login', authUser)
userRoutes
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  userRoutes
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default userRoutes
