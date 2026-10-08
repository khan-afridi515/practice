import express from 'express';
import { createOrder, getOrder, getOrders, getpagination, getpipeline } from '../controller/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrder);
router.get('/getdata', getpagination);
router.get('/getpipeline', getpipeline);
router.get('/find', getOrders);

export default router;
