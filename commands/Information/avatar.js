const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  accessableby: "everyone",
  async run(client, message, args) {
    if (args[0] && args[0].toLowerCase() === "server") {
      let g1g = message.guild.iconURL({
        dynamic: true,

        size: 2048,

        format: "png"
      });

      if (g1g === null) g1g = "https://cdn.discordapp.com/embed/avatars/1.png";

      let embed = new Discord.MessageEmbed()

        .setColor("GREEN")

        .setAuthor(``, g1g)

        .setTitle("")

        .setURL(g1g)

        .setImage(g1g)

        .setFooter("What a beautiful image! .w. Yes!")
      message.channel.send(embed);
    } else {
    let hh = message.content

      .split(" ")

      .slice(1)

      .join(" ");
    let user;

    if (!args[0]) user = message.author;

    if (!user) user = message.mentions.users.first();

    if (!user && /^\d{17,19}$/.test(args[0]))
      user =  message.client.users.cache.get(args[0]) ||        (await message.client.users.fetch(args[0]).catch(() => null));
    if (!user)
      return message.channel.send(
        '```md\n[ERROR]\nMissing argument, the "user" argument is required```'
      );
    let gg = user.displayAvatarURL({
      dynamic: true,

      size: 2048,

      format: "png"
    });

    if (gg === null) gg = "https://cdn.discordapp.com/embed/avatars/1.png";

    let g1g = user.displayAvatarURL({
      dynamic: true,

      size: 2048,

      format: "png"
    });

    if (g1g === null) g1g = "https://cdn.discordapp.com/embed/avatars/1.png";

    let embed = new Discord.MessageEmbed()

      .setColor("GREEN")

      .setAuthor(``, gg)

      .setImage(gg)

      .setFooter("What a beautiful image!")

    message.channel.send(embed);
  }}
};