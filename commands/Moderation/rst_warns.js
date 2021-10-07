const db = require("quick.db");

module.exports = {
  name: "reset_warns",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "<:failed_icon:892192398380240916> You need these permissions **\`MANAGE_MESSAGES\`**"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("<:error_icon:892192398443155466> Mention a user to warn them");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("The bots are not at this party! 😎");
    }

    if (message.author.id === user.id) {
      return message.channel.send("<:error_icon:892192398443155466> You do not have permissions to do that");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} You have no warning's now ..`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `<:check_iconn:892192398199906305> Your warnings were restored by the user ${message.author.username} from ${message.guild.name}`
    );
    await message.channel.send(
      `<:check_iconn:892192398199906305>Warnings reset again of ${message.mentions.users.first().username}`
    );
  }
};
