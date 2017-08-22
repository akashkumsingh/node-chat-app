  //This io() function is available to us via socket.io.js lib. This is used to make connection to the server
  let socket = io();
  socket.on("connect", function () {
      console.log("Connected to the Server");

  });
  socket.on("disconnect", () => {
      console.log("User is Disconnected");
  });
  socket.on("newMessage", (newMessage) => {
    var currentTime=moment(newMessage.createdAt).format("h:mm a");
      var template=$("#message-template").html();
      var html=Mustache.render(template,{
          text:newMessage.text,
          from:newMessage.from,
          createdAt:currentTime
      });
      jQuery("#msglist").append(html);
  });

  socket.on("newLocationMessage", function (msg) {
    var currentTime=moment(msg.createdAt).format("h:mm a");
    var locationTemplate=$("#location-message-template").html();
      var html=Mustache.render(locationTemplate,{
          from:msg.from,
          url:msg.url,
          createdAt:currentTime
      });
      jQuery("#msglist").append(html);
  });

  jQuery("#message-form").on("submit", function (e) {
      e.preventDefault();
      socket.emit("createMessage", {
          from: "User",
          text: jQuery("[name=msg]").val()
      }, function () {
          jQuery("[name=msg]").val('');
      });
  });

  //   var location = jQuery("#sendloc");
  $("#sendloc").on("click", function () {
      if (!navigator.geolocation) {
          return alert("Your browser doesnt suppport location services");
      }
      $("#sendloc").attr("disabled", "disabled").text("Sending location...");
      navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          $("#sendloc").removeAttr("disabled").text("Send location");
          socket.emit("locationMessage", {

              longi: position.coords.longitude,
              lati: position.coords.latitude
          });
      }, function () {
          $("#sendloc").removeAttr("disabled").text("Send location");
          alert("Unable to fetch your location");
      });
  });