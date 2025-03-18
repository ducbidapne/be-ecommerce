import express from 'express';
import { authenticateUser, authorizeAdmin } from "../controllers/user.controller.js";
import {
  getOrders,
  createOrder,
  getOrderSummary,
  getUserOrders,
  getOrderById,
  payOrder,
} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/', authenticateUser, authorizeAdmin, getOrders);
orderRouter.post('/', authenticateUser, createOrder);
orderRouter.get('/summary', authenticateUser, authorizeAdmin, getOrderSummary);
orderRouter.get('/mine', authenticateUser, getUserOrders);
orderRouter.get('/:id', authenticateUser, getOrderById);
orderRouter.put('/:id/pay', authenticateUser, payOrder);

export default orderRouter;
