import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

// Lấy danh sách đơn hàng (chỉ Admin)
export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name');
  res.send(orders);
});

// Tạo đơn hàng mới
export const createOrder = expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', order });
});

// Lấy thông tin tóm tắt cho dashboard
export const getOrderSummary = expressAsyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const users = await User.countDocuments();
  
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        sales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);

  res.send({ users, orders, dailyOrders, productCategories });
});

// Lấy danh sách đơn hàng của người dùng
export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

// Lấy chi tiết đơn hàng theo ID
export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
});

// Xác nhận thanh toán đơn hàng
export const payOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
});
