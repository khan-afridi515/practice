import express from 'express';
import dbconnection from './database/db.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const PORT = 3000;

app.listen(PORT, () => {
    dbconnection();
    console.log(`Server is running on port ${PORT}`);
});