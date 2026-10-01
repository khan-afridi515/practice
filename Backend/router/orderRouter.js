import express from 'express';
import { createOrder, getOrder, getpagination, getpipeline } from '../controller/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrder);
router.get('/getdata', getpagination);
router.get('/getpipeline', getpipeline);

export default router;
