const express = require("express");
const http = require("http");//To add socket support in our we need to configure our server using http.
const socketIO = require("socket.io");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

let server = http.createServer(app);//this function is literally equals to app.listen(); 
let io = socketIO(server);//In this function call we passed "server" i.e server that we wanna use in our web socket
io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("disconnect", () => {
        console.log("User Disconnected Successfully.");
    })
})
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});