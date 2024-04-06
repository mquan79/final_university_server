const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const ipv4 = process.env.REACT_APP_IPV4;

app.use(cors());
app.use(bodyParser.json());
let arrUserConnect = []
io.on('connection', (socket) => {
    socket.on('Join', (user) => {
        socket.peerId = user.peerId
        const isExist = arrUserConnect.some(e => e.peerId === user.peerId)
        if (isExist) {
            return io.emit('Fail')
        }
        arrUserConnect.push(user);
        socket.broadcast.emit('New user', user);
        console.log('Client connected:', arrUserConnect);
        console.log('Gửi danh sách user ', arrUserConnect);
        io.to(socket.id).emit('List online', arrUserConnect);
    })

    socket.on('disconnect', () => {
        const index = arrUserConnect.findIndex((user) => user.peerId === socket.peerId);
        arrUserConnect.splice(index, 1);
        io.emit('User diconnect', socket.peerId);
        console.log('Client disconnected:', arrUserConnect);
    });
});

server.listen(8000, ipv4, () => {
    console.log(`Server is running at http://${ipv4}:8000`);
});
