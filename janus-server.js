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
let arrUserConnectSharing = []
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('Join', (user) => {
        socket.peerId = user.peerId
        const isExist = arrUserConnect.some(e => e.peerId === user.peerId)
        if (isExist) {
            return io.emit('Fail')
        }
        arrUserConnect.push(user);
        socket.broadcast.emit('New user', user);
        // console.log('Client connected:', arrUserConnect);
        // console.log('Gửi danh sách user ', arrUserConnect);
        const arrUser = arrUserConnect.filter(e => e.peerId !== user.peerId)
        io.to(socket.id).emit('List online', arrUser);
    })

    socket.on('Join sharing', (user) => {
        console.log('sHAROG', arrUserConnectSharing)
        socket.peerId = user.peerId
        const isExist = arrUserConnectSharing.some(e => e.peerId === user.peerId)
        if (isExist) {
            return io.emit('Fail')
        }
        arrUserConnectSharing.push(user);
        socket.broadcast.emit('New user sharing', user);
        // console.log('Client connected:', arrUserConnectSharing);
        // console.log('Gửi danh sách user ', arrUserConnectSharing);
        const arrUser = arrUserConnectSharing.filter(e => e.peerId !== user.peerId)
        io.to(socket.id).emit('List online sharing', arrUser);
    })

    socket.on('CALL', (user) => {
        socket.peerId = user.peerId
        console.log(user)
        socket.broadcast.emit('JOIN', user);
    })
    
    socket.on('Change video', (data) => {
        socket.broadcast.emit('Change video', data);
    })

    socket.on('Change video conference', (data) => {
        socket.broadcast.emit('Change video conference', data);
    })

    socket.on('Change audio', (data) => {
        socket.broadcast.emit('Change audio', data);
    })

    socket.on('Change audio conference', (data) => {
        socket.broadcast.emit('Change audio conference', data);
    })

    socket.on('Off call', (data) => {
        socket.broadcast.emit('Off call', data);
    })

    socket.on('OFF Conference', (data) => {
        socket.broadcast.emit('OFF Conference', data);
    })

    socket.on('disconnect', () => {
        const index = arrUserConnect.findIndex((user) => user.peerId === socket.peerId);
        arrUserConnect.splice(index, 1);
        const indexx = arrUserConnectSharing.findIndex((user) => user.peerId === socket.peerId);
        arrUserConnectSharing.splice(indexx, 1);
        io.emit('User diconnect', socket.peerId);
        console.log('Client disconnected:', arrUserConnect);
    });
});

server.listen(8000, ipv4, () => {
    console.log(`Server is running at http://${ipv4}:8000`);
});
