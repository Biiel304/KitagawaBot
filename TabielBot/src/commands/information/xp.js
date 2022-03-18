const Discord = require("discord.js");
const CavaCord = require("canvacord");
const User = require("../../database/Schemas/User");

exports.run = (client, message, args) => {
  let USER =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author;

  User.findOne({ _id: USER.id }, async function (err, user) {
    await require("mongoose")
      .connection.collection("users")
      .find({ "Exp.xp": { $gt: 5 } })
      .toArray((err, res) => {
        if (err) throw err;
        let Exp = res.map((x) => x.Exp).sort((x, f) => f.level - x.level);

        let ranking = [...Exp.values()].findIndex((x) => x.id === USER.id) + 1;

        let xp = user.Exp.xp;
        let level = user.Exp.level;
        let nextLevel = user.Exp.nextLevel * level;

        const rank = new CavaCord.Rank()
          .setAvatar(USER.displayAvatarURL({ format: "jpg" }))
          .setCurrentXP(xp)
          .setRequiredXP(nextLevel)
          .setRank(ranking, "Rank", true)
          .setLevel(level)
          .setBackground(
            "IMAGE",
            "https://cdn.discordapp.com/attachments/848332258800304161/954113367159742596/665374.jpg"
          )
          .setOverlay("#fb00ff", 0.2, true)
          .setStatus(USER.presence.status)
          .setProgressBar("#fb00ff")
          .setUsername(USER.username)
          .setDiscriminator(USER.discriminator);

        rank.build().then((data) => {
          const attachment = new Discord.MessageAttachment(
            data,
            `${USER.tag}--RANK.png`
          );
          message.quote(attachment);
        });
      });
  });
};

exports.help = {
  name: "xp",
  aliases: ["level"],
  description: "Comando para saber seu nivel/xp no servidor",
  usage: "<prefix>xp <@user>",
  category: "information"
};
