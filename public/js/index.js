  //This io() function is available to us via socket.io.js lib. This is used to make connection to the server
  let socket=io();
  socket.on("connect",function(){
      console.log("Connected to the Server");
      socket.emit("createMessage",{
          from:"sudan@gmail.com",
          text:"This is Malkeet",
      });
     
  });
  socket.on("disconnect",()=>{
  console.log("User is Disconnected");
  });
  socket.on("newMessage",(newMessage)=>{
    console.log("New message",newMessage);
});