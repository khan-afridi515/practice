import express from 'express';
import dbconnection from './database/db.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';
import http from 'http'
import { Server, Socket } from 'socket.io';
import { isObjectIdOrHexString } from 'mongoose';
import cors from 'cors';

const app = express();

const server = http.createServer(app)

app.use(cors({
    origin: "http://localhost:5173"
}))

const io = new Server(server, {
    cors:{
        origin : "http://localhost:5173",
        methods : ["GET", "POST"],
    },
})

io.on('connection', (socket)=>{
    console.log("User connected", socket.id)

    socket.on("send_message", (data)=>{
        console.log("message recieved", data);
        io.emit("recieve_message", data);
    })

    
})


app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const PORT = 3000;

server.listen(PORT, () => {
    dbconnection();
    console.log(`Server is running on port ${PORT}`);
});