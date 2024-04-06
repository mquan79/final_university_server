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
let arrConference = [];
let arrUser = [];

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('Message', (data) => {
        console.log('Gửi tin nhắn')
        socket.broadcast.emit('Message', data);
    });

    socket.on('Message direct', (data) => {
        socket.broadcast.emit('Message direct', data);
    });

    socket.on('Call Video', (data) => {
        socket.broadcast.emit('Call Video', data)
    })

    socket.on('No Call', (data) => {
        socket.broadcast.emit('No Call', data)
    })

    socket.on('On Sharing', (data) => {
        io.emit('On Sharing', data)
    })

    socket.on('Off Sharing', (data) => {
        io.emit('Off Sharing', data)
    })

    socket.on('Join Conference', (data) => {
        socket.broadcast.emit('Join Conference', data)
    })

    socket.on('No Call Off', (data) => {
        socket.broadcast.emit('No Call Off', data)
    })

    socket.on('No Calling', (data) => {
        socket.broadcast.emit('No Calling', data)
    })

    socket.on('Login', (data) => {
        const isExist = arrUser.some(e => e._id === data._id)
        if (!isExist) {
            arrUser.push({...data, socketId: socket.id});
            io.to(socket.id).emit('Login Success', data);
            console.log(arrUser)
        } else {
            console.log('FAIL');
            io.to(socket.id).emit('Fail', data);
        }
    })

    socket.on('Login Success', (data) => {
        io.to(socket.id).emit('Login Success', data);
        const userLogout = arrUser.find(e => e._id === data._id)
        io.to(userLogout.socketId).emit('Login logout', data);
    })

    socket.on('Login Fail', () => {
        io.to(socket.id).emit('Login Fail');
    })

    socket.on('Logout', (data) => {
        const index = arrUser.findIndex(e => e._id === data._id)
        arrUser.splice(index, 1);
    })

    socket.on('Conference', (data) => {
        const isExist = arrConference.some(e => e._id === data._id)
        if (!isExist) {
            arrConference.push(data);
            socket.broadcast.emit('Conference', data);
        }
        console.log("ARR", arrConference)
    })

    socket.on('OFF Conference', (data) => {
        console.log('OFF CONFERENCE', data)
        const index = arrConference.findIndex(e => e._id === data)
        arrConference.splice(index, 1);
        console.log("ARR", arrConference)
    })

    socket.on('On Call', (data) => {
        socket.broadcast.emit('On Call', data)
    })

    socket.on('Online Call', (data) => {
        console.log('Online Call', data)
        socket.broadcast.emit('Online Call', data)
    })

});

server.listen(8080, ipv4, () => {
    console.log(`Server is running at http://${ipv4}:8080`);
});
