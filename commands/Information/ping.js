const discord = require("discord.js");

module.exports = {
  name: "ping",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`Ping strength currently <:wifi_icon:892192397868556298> **${client.ws.ping}ms**`)
    .setColor()
    .setFooter(`ShixLuz v3.7.1 | HouldxLuz`)
    
    message.channel.send(embed)
  }
}