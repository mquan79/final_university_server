const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/userModel.js');
const Message = require('./models/messageModel.js');
const userController = require('./controllers/userController.js');
const messageController = require('./controllers/messageController.js');
const friendController = require('./controllers/friendController.js');
const groupController = require('./controllers/groupController.js');
const topicGroupController = require('./controllers/topicGroupController.js');
const groupMemberController = require('./controllers/groupMemberController.js');
const groupMemberMessageController = require('./controllers/groupMemberMessageController.js');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const ipv4 = process.env.REACT_APP_IPV4;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/users', userController);
app.use('/messages', messageController);
app.use('/friends', friendController);
app.use('/groups', groupController);
app.use('/topicgroups', topicGroupController);
app.use('/groupmembers', groupMemberController);
app.use('/groupmembermessages', groupMemberMessageController);


mongoose.connect('mongodb://localhost:27017/chatapp');
const db = mongoose.connection;

app.get('/', (req, res) => {
  res.send('Server is running');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // Xử lý sau khi upload
  res.json({ message: 'File uploaded successfully' });
});

app.get('/getFiles', (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ files });
  });
});


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// let urlImag = null
// const uploadFile = async (req, res) => {
//   try {
//     const file = req.file;
//     const imageUrl = `http://${ipv4}:${PORT}/uploads/${file.filename}`;
//     urlImag = imageUrl
//     res.json({ message: 'Tệp tin đã được tải lên thành công', imageUrl });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// app.post('/upload', upload.single('file'), uploadFile);
// let userConnect = [];
io.on('connection', (socket) => {
  // socket.on('message', (data) => {
  //   console.log('Thông báo cho', socket.id, 'có', data.data)
  //   if (userConnect[data.chatRoomID]) {
  //     console.log('Thông báo cho', userConnect[data.chatRoomID], 'có ', data.data, 'từ', data.sendName);
  //     io.to(userConnect[data.chatRoomID]).emit('receiver message', data.data);
  //     io.to(userConnect[data.chatRoomID]).emit('sender name', data.sendName);
  //   }
  //   io.to(socket.id).emit('message');
  //   io.to(userConnect[data.chatRoomID]).emit('message');
  // });

  // socket.on('delete message', () => {
  //   io.to(socket.id).emit('message');
  // })


  // socket.on('isSeen', () => {
  //   io.to(socket.id).emit('isSeen')
  // })

  // socket.on('seen', (userId) => {
  //   // io.to(socket.id).emit('seen')
  //   io.to(userConnect[userId]).emit('seen')
  // })

  // socket.on('close by receiver caller', (data) => {
  //   io.to(userConnect[data]).emit('close by receiver caller', null)
  // })

  // socket.on('close by caller', (data) => {
  //   console.log(data)
  //   io.to(userConnect[data]).emit('close by caller', null)
  // })




  // socket.on('is Call', (data) => {
  //   // console.log('Điện thoại cho', data.idUser)
  //   if (userConnect[data.idUser]) {
  //     // console.log('Có điện thoại từ ', data.idAuth)
  //     io.to(userConnect[data.idUser]).emit('is call to', data.idAuth)
  //     io.to(userConnect[data.idUser]).emit('notification call', data.name)
  //   }
  // })

  // socket.on('logout', (userId) => {
  //   delete userConnect[userId];
  //   io.emit('logout')
  //   console.log(`User with ID ${userId} has logged out. Updated userConnect:`, userConnect);
  // });

  // socket.on('disconnect', () => {
  //   const userId = Object.keys(userConnect).find(key => userConnect[key] === socket.id);
  //   if (userId) {
  //     delete userConnect[userId];
  //     console.log(`User with ID ${userId} has disconnected. Updated userConnect:`, userConnect);
  //   }
  // });
});

server.listen(PORT, ipv4, () => {
  console.log(`Server is running at http://${ipv4}:${PORT}`);
});
