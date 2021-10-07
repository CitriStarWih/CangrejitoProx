const db = require('quick.db')
const discord =require('discord.js')
const { MessageEmbed } = require('discord.js')
module.exports = { 
  name: "afk",
  run: async (client, message, args) => {

    const content = args.join(" ")
    await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
    const embed = new MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`)
    .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`**Status changed to AFK**\n\n**Reason:** ${content || "Has not given a reason :("}`)
        .setColor()
        .setFooter('Everyone who mentions you will be notified .w.')
    message.channel.send(embed)
   }
}