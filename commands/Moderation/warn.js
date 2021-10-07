const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "<:error_icon:892192398443155466> You need these permissions! **\`MANAGE_MESSAGES\`**"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
          "To warn the user you must locate this in the channel - x/warn @mention <reason>"
      );
    }
    
    if (message.mentions.users.first().bot) {
      return message.channel.send("You can't spot bots, they're not at the party! 😎");
    }

    if (message.author.id === user.id) {
      return message.channel.send("You cannot do that, you are yourself! <:warning_icon:892192398384447498>");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "<:error_icon:892192398443155466> Do not do that! Is the owner of the server!"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "<:warning_icon:892192398384447498> Do this to be able to do what you tell me - x/warn @mention <reason>"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `<:check_iconn:892192398199906305> You have been warned in **${message.guild.name}** for the reason **${reason}**`
      );
      await message.channel.send(
        `You warned **${
          message.mentions.users.first().username
        }** for the reason **${reason}**`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`<:check_iconn:892192398199906305> You have been warned in **${message.guild.name}** for the reason **${reason}**`);
      
      await message.channel.send(`<:check_iconn:892192398199906305> You warned **${message.mentions.users.first().username}** for the reason **${reason}**`);
      
      message.delete
      
    }
  }
};
