const Guild = require("../../database/Schemas/Guild");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.quote(
      `${message.author}, tentou usar um comando restrito!!! Somente os administradores podem usar esse comando!`
    );
  Guild.findOne({ _id: message.guild.id }, async function (err, server) {
    let prefixo = args[0];

    if (!prefixo) {
      return message.channel.send(
        `${message.author}, Você deve inserir um **prefixo**!`
      );
    } else if (prefixo.length > 5) {
      return message.channel.send(
        `${message.author}, você não pode colocar um prefixo com mais de **5** catacteres.`
      );
    } else if (prefixo == server.prefix) {
      return message.channel.send(
        `${message.author}, O prefixo informado é o mesmo setado atualmente, tente novamente com um prefixo diferente!.`
      );
    } else {
      message.channel.send(
        `${message.author}, meu prefixo em seu servidor foi alterado para **${prefixo}** com sucesso!`
      );

      await Guild.findOneAndUpdate(
        { _id: message.guild.id },
        { $set: { prefix: prefixo } }
      );
    }
  });
};

exports.help = {
  name: "prefix",
  aliases: ["setprefix"],
};
