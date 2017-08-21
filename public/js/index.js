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

  socket.on("newLocationMessage", function (msg) {
      var li = jQuery("<li></li>");
      var a = jQuery("<a target='_blank'>My current location</a>");
      li.text(`${msg.from}:`);
      a.attr('href', msg.url);
      li.append(a);
      jQuery("#msglist").append(li);
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