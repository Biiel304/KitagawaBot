const User = require("../../database/Schemas/User");

exports.run = async (client, message, args) => {
  User.findOne({ _id: message.author.id }, async function (err, user) {
    let coins = user.coins;

    message.quote(
      `${
        message.author
      }, seu saldo é de **${coins.toLocaleString()} Tabcoins**.`
    );
  });
};

exports.help = {
  name: "atm",
  aliases: ["coins"],
};
