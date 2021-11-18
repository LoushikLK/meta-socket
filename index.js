const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http');
const server = http.createServer(app);


app.use(cors())

app.use(express());

const PORT = process.env.PORT || 8000

const io = require("socket.io")(server)


let users = []



io.on('connection', (socket) => {
    // console.log('a user connected');
    socket.on('new-user-joined', details => {
        // console.log(details);

        details = JSON.parse(details)

        users.push(details.name)

        // console.log(users);

        // let unique = users.filter((item, i, ar) => ar.indexOf(item) === i);
        users = users.filter((item, i, ar) => ar.indexOf(item) === i);

        console.log(users);

        // // users[socket.id] = name;
        socket.broadcast.emit('user-joined', JSON.stringify({ details, length: users.length }));

    });

    socket.on("send-chat-message", data => {
        console.log(data);
        io.emit("recieve-chat-message", data)
    })
});

server.listen(PORT, () => {
    console.log(`socket server started at port ${PORT}`)
})
