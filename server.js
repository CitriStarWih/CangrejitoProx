
//// Bot Ready and Custom Status /////
client.on("ready", () => {
    client.user.setActivity("c.help | v1.7.0", {
  type: "LISTENING",  //// Status, Listening, Playing, Watching, Competing and Streaming ////
});
})


///// Client
client.login(config.token);
