const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("<:failed_icon:892192398380240916> You need these permissions! **\`MANAGE_ROLES\`**");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("<:failed_icon:892192398380240916> I don't have permission to mute the user **\`MANAGE_ROLES\`**");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("\``` <:failed_icon:892192398380240916> Mention a user to mute!\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("You cannot do that, you are yourself! 😑");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send(" \``You need a reason to mute it! ❗\``` ");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (!muterole) {
      return message.channel.send("\``` <:warning_icon:892192398384447498> Create a role called <muted> and denies their permissions \``` ");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(`You have been muted to **${message.mentions.users.first().username}** for the reason **${reason}**`);

    user.send(`You have been muted on the server **${message.guild}** for the reason **${reason}** 😞`);
  }
};
