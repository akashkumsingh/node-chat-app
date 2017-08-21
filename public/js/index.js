  //This io() function is available to us via socket.io.js lib. This is used to make connection to the server
  let socket = io();
  socket.on("connect", function () {
      console.log("Connected to the Server");

  });
  socket.on("disconnect", () => {
      console.log("User is Disconnected");
  });
  socket.on("newMessage", (newMessage) => {
      console.log("New message", newMessage);
      var li = jQuery("<li></li>");
      li.text(`${newMessage.from}:${newMessage.text}`);
      jQuery("#msglist").append(li);
  });

socket.on("newLocationMessage",function(msg){
    var li = jQuery("<li></li>");
    var a=jQuery("<a target='_blank'>My current location</a>");
    li.text(`${msg.from}:`);
    a.attr('href',msg.url);
    li.append(a);
    jQuery("#msglist").append(li);
});

  jQuery("#message-form").on("submit", function (e) {
      e.preventDefault();
      socket.emit("createMessage", {
          from: "User",
          text: jQuery("[name=msg]").val()
      }, function () {});
  });

  //   var location = jQuery("#sendloc");
  $("#sendloc").on("click", function () {
      if (!navigator.geolocation) {
          return alert("Your browser doesnt suppport location services");
      }
      navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          socket.emit("locationMessage", {
              longi: position.coords.longitude,
              lati: position.coords.latitude
          });
      }, function () {
          alert("Unable to fetch your location");
      });
  });