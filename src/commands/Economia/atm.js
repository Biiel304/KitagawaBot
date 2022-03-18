const User = require("../../database/Schemas/User");

exports.run = async (client, message, args) => {
  const USER = client.users.cache.get(args[0]) || message.mentions.members.first() || message.author
  User.findOne({ _id: USER.id }, async function (err, user) {
    let coins = user.coins;

    message.quote(
      `${
        message.author
      }, ${USER.id == message.author.id ? `Você possui ` : `o usuário possui`}**${coins.toLocaleString()} coins** no momento.`
    );
  });
};

exports.help = {
  name: "atm",
  aliases: ["coins"],
  description: "Comando para saber seu saldo",
  usage: "<prefix>atm",
  category: "Economia"
};
