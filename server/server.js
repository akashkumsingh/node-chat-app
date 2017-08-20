const express = require("express");
const http = require("http"); //To add socket support in our we need to configure our server using http.
const socketIO = require("socket.io");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

//this function is literally equals to app.listen(); 
let server = http.createServer(app);

//In this function call we passed "server" i.e server that we wanna use in our web socket
//And what we get back is a web socket server and on here we can do anything in terms of emitting or listening to events.This is
//we gonna communicate between client and the server.

let io = socketIO(server);
io.on("connection", (socket) => { //It lets you register an event listener where we can listen to any event and respond to that event

    console.log("New user connected");
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New User Joined",
        createdAt: new Date().getTime()
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected Successfully.");
    });
    socket.on("createMessage", (message) => {
        console.log("There is a new message : ", message);
        io.emit("newMessage", { /*socket.emit() emits an event to a single connnection only whereas io.emit() emits an event to every single connection*/
            from: message.from,
            text: message.text,
            createdAt: new Date().getDate()
        });
        // socket.broadcast.emit("newMessage",{/*socket.broadcast() emits an event to everyone but the user who emits it.*/
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getDate()
        // })
    });
    // socket.emit("newMessage",{
    //     from:"shivanshu@gmail.com",
    //     text:"Meri gaand maaro",
    //     createdAt:32213512
    // })
})
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});