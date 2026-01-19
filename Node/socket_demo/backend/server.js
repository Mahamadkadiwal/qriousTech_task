const express = require('express');
const {createServer} = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = createServer(app);

const cors = require('cors');

const corsOption  ={
    origin: '*',
    methods: ['GET', 'POST']
}

const io = new Server(server, {
    cors: corsOption
});

app.use(cors(corsOption))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("joinRoom", ({user, room}) => {
        socket.join(room);
        console.log(`${user} joined room: ${room}`);
    })

    socket.on('clientMessage', (msg) => {
        io.to(msg.room).emit("serverMessage", msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(4000, () => {
    console.log('listening on http://localhost:4000');
})