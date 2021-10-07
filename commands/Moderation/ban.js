const discord = require("discord.js");

module.exports = {
  name: "ban",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`<:error_icon:892192398443155466> You need these permissions to ban someone **\`BAN_MEMBERS\`** `)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`<:error_icon:892192398443155466> I need the following permissions **\`BAN_MEMBERS\`**`)
    
    if(!args[0]) return message.reply(`You need to mention a user to ban him 🙄`)
    
    if(!target) return message.reply(`<:failed_icon:892192398380240916> I can't find the mentioned user`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`Are you not blind? I'm kidding .. You can't ban they have a higher rank than you! <:warning_icon:892192398384447498>`)
    }
    
    if(target.id === message.author.id) return message.reply(`You cannot ban an owner or he will do the opposite with you 😥`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setTitle('User Baned ✅')
      .setAuthor('ShixLuz Ban System', 'https://i.imgur.com/DtbnnVZ.png')
      .setColor("GREEN")
      .setDescription(`The user **\`${target}\`** was banned by : **\`${reason || "No specific reason ❗"}\`** <:check_icon:891849824650018876>`)
      .setFooter('ShixLuz v3.7.1')
      
      message.channel.send(embed)
      
      target.ban()
      
      
    } else {
      return message.reply(`Error.. Check if the user's role is lower than mine 😓`)
    }
    return undefined
  }
};