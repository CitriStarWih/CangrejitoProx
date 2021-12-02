const Discord = require("discord.js"), moment = require("moment"); //npm i discord.js moment

const Color = "RANDOM";


module.exports = {
  name: "whois",
  run: async (client, message, args) => {

      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Dism = User.user.discriminator, Bot = User.user.bot ? "Yes" : "No";
    const Roles = (User.roles.cache.size - 1) == 0 ? "None" : User.roles.cache.size - 1, Avatar = User.user.avatarURL({ dynamic: true });
    const Badges = await (await User.user.fetchFlags(true)).toArray().map(F => F[0] + (F.slice(1).toLowerCase().replace(/_/g, " "))).join(", "), Permissions = await User.permissions.toArray().map(P => (P[0] + P.slice(1).toLowerCase()).replace(/_/g, " ")).sort().join(", ");
    const Position = User.id == message.guild.ownerID ? "Owner" : User.hasPermission("ADMINISTRATOR") ? "Administrator" : User.hasPermission("KICK_MEMBERS") ? "Moderator" : User.hasPermission("MANAGE_MESSAGES") ? "Trainee Moderator" : "Member", Status = User.presence.status.charAt(0).toUpperCase() + User.presence.status.slice(1);
    const Created = await Format(User.user.createdTimestamp), Joined = await Format(User.joinedTimestamp);
    const Place = User.user.presence.clientStatus ? Object.keys(User.user.presence.clientStatus).map(E => E.charAt(0).toUpperCase() + E.slice(1)) : [], Activity = User.presence.activities ? await Activities(User.presence.activities) : [];

    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail("https://i.imgur.com/imd1q5V.gif%22")
    .setDescription(`**Information and More** <:gaming_icon:892192398271217714>\n\n**User:** ${User.user.username}\n**Nick Name:** ${User.nickname ? ` (${User.nickname})` : ""}\n**ID:** ${User.id}\n\n **Account records** <:info_icon:892192398380236810>\n\n**Created:** \`${Created}\` \n**Joined:** \`${Joined}\` \n\n**Discord User Badges**\n<:bravery_icon:892193334431457320> **\`|\`** <:brillance_icon:892193334066556981> **\`|\`** <:balance_icon:892193334251102258>\n\n**Badges:** ${Badges ? Badges : "No badges earned 😔"}\n\n`)
    .addFields({
                    name: 'Roles Obtained: 🏅',
                    value: User.roles.cache.map(role => role.toString()).join("  "),
                    inline: true
                }
            )
    .setFooter("ShixLuz v3.7.1 | HouldxLuz", client.user.avatarURL())
    
    return message.channel.send(Embed);

    async function Activities(Arr); {
      const Types = {
        PLAYING: "Playing",
        STREAMING: "Streaming",
        LISTENING: "Listening",
        WATCHING: "Watching",
        CUSTOM_STATUS: "Custom Status",
        COMPETING: "Competing"
      };

      Arr = Arr.map(E => Types[E.type] + `: ${E.type == "CUSTOM_STATUS" ? `${E.emoji ? E.emoji.name + " " : ""}${E.state}` : E.name}`);
      return Arr;
    };

    async function Format(Stamp) {
       return `${String(moment(Stamp).format("LL")).replace(",", "")} ${moment(Stamp).format("LT")} (${moment(Stamp).fromNow()})`
    };
  }
};
