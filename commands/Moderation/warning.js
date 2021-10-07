const db = require("quick.db");

module.exports = {
  name: "warnings",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`Warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} You Have **${warnings}** Warning(s) Uh Oh! 😔`);
  }
};