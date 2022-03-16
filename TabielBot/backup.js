const User = require("../../database/Schemas/User");
const ms = import("parse-ms");

exports.run = async (client, message, args) => {
  User.findOne({ _id: message.author.id }, async function (err, user) {
    let cooldown = 8.64e7;
    let coins = Math.floor(Math.random() * 100);
    let daily = user.daily;
    let atual = user.coins;

    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
      let time = cooldown - (Date.now() - daily);
      let hours = time.hours;
      let minutes = time.minutes;
      let seconds = time.seconds;

      return message.quote(
        `${
          message.author
        }, espera lá espertinho, o tempo de espera para o próximo daily ainda não passou! espere mais **${
          time.hours <= 1 ? `1 hora` : `${time.hours} horas`
        }** **${
          time.minutes <= 1 ? "1 minuto" : `${time.minutes} minutos`
        }** e **${time.seconds}** segundos!`
      );
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
};
