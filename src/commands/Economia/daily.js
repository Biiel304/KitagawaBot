const User = require("../../database/Schemas/User");
const ms = import("parse-ms");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  User.findOne({ _id: message.author.id }, async function (err, user) {
    let useR = message.author;

    let daily = user.daily;

    let atual = user.coins;

    let coins = Math.floor(Math.random() * 5000 + 500);

    let cooldown = 8.64e7;

    let time = cooldown - (Date.now() - daily);

    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
      let time = ms.cooldown - (Date.now() - daily);

      const tempo = new MessageEmbed().setColor("#DDA0DD")
        .setDescription(`> ❌ **| Você ja coletou o daily ${message.author}**
>  por favor espere o prazo para solicitar novamente`);

      return message.quote(tempo);
    } else {
      message.quote(
        `Bem vindo de volta ${
          message.author
        }! Hoje você ganhou **${coins}** coins! \nagora você tem um total de **${(
          atual + coins
        ).toLocaleString()}** coins. \nNão se esqueça de mim amanha hein!`
      );
      await User.findOneAndUpdate(
        { _id: message.author.id },
        { $set: { coins: coins + atual, daily: cooldown + Date.now() } }
      );
    }
  });
};

exports.help = {
  name: "daily",
  aliases: ["diario"],
  description: "comando para pegar seu premio diário",
  usage: "<prefix>daily",
  category: "Economia"
};
