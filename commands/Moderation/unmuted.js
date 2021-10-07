const db = require("quick.db");

module.exports = {
  name: "unmute",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "<:failed_icon:892192398380240916> You need these permissions **\`MANAGE_ROLES\`**"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("<:failed_icon:892192398380240916> I do not have these permissions **\`MANAGE_ROLES\`**");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Mention a user to unmute! <:warning_icon:892192398384447498>");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("The user does not have that role, what should I do now? ._.");
    }

    user.roles.remove(muterole)

    await message.channel.send(`The User **${message.mentions.users.first().username}** has been unmuted and can now write!`);

    user.send(`🔔 Uh! You have been unmuted from **${message.guild.name}**`);
    
    message.delete()
  }
};