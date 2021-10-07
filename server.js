///// Important
const { default_prefix } = require("./config.json")
const DisTube = require("distube");
 
 const fetch = require("node-fetch");
const moment = require("moment");
const db =require("quick.db");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const { emotes , emoji} =require("./config.json")
const discord = require("discord.js");
const client = new discord.Client({ ws: { properties: { $browser: "Discord Android" }}})

///// Search
const yts = require('yt-search')
const { ready } = require("./handlers/ready.js")
const cofig = require("./config.json")

//// Finish

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

//// Handlers!
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.queue = new Map()
process.on('unhandledRejection', console.error);

///// Finish
  
//// Bot Message ////
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  ///// Mention Bot
  let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`); 

if (message.content.match(RegMention)) {
    message.channel.send('My Default Prefix is **\`x!\`**')
};
///// Finish
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

/// Bot Status
client.on("ready", () => {
    client.user.setStatus("idle");
    console.log("Stay! Whooo!")
});

//// Prefix
client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  if(!message.content.startsWith(prefix)) return;
 
})
 

//// Bot Ready and Custom Status /////
client.on("ready", () => {
    client.user.setActivity("c.help | v1.7.0", {
  type: "LISTENING",  //// Status, Listening, Playing, Watching, Competing and Streaming ////
});
})
 ///// Console
console.log("All okay, alright?")

//// Message Important
require("./ExtendedMessage");
 allowedMentions: {
        repliedUser: true
    }

///// Client
client.login(config.token);