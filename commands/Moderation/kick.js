const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "kick",
category: "moderation",
description: "kick a user",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
run: async(client, message, args) => {  
const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")
          if (!args[0]) return message.channel.send("<:error_icon:892192398443155466> You have to mention the user and give a reason to kick him out")
        if (!mentionedMember) return message.channel.send("<:error_icon:892192398443155466> I can't find the user you are looking for..")
        if (mentionedMember.id === message.author.id) return message.channel.send("🙄 Don't be silly, you can't do that!")
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send("<:error_icon:892192398443155466> The role of the user I mention is higher than yours!")
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setTitle('ShixLuz Kick System <:check_iconn:892192398199906305>')
            .setColor(`GREEN`)
            .setDescription(`
**User Kicked** : **\`${mentionedMember.user.username} - (${mentionedMember.user.id})\`**\n**Moderator** : **\`${message.author.username}\`**\n**Reason and More** : \`${reason || "No specific reason"}\`

`)
.setFooter('ShixLuz v3.7.1 | HouldxLuz')
        message.channel.send(embed)
        mentionedMember.kick()
        } else {
            return message.channel.send("<:error_icon:892192398443155466> I can't run the command because the role of the user you mention is higher than mine!")
        }
        return undefined
    let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User Kicked**", kickMember.user.username)
                .addField("**Kicked By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        }
    }
