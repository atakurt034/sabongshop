import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  deleteOrder,
  updateOrderToCancelled,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
// set on the bottom to prevent being seen as an id
router.route('/myorders').get(protect, getMyOrders)
router
  .route('/:id')
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancel').put(protect, updateOrderToCancelled)

export default router
