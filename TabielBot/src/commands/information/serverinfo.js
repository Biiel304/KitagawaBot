const Discord = require("discord.js");
const moment = require("moment");
const message = require("../../client/events/message");

exports.run = async (client, message, args) => {
  moment.locale("pt-BR");

  let boost =
    message.guild.premiumSubscriptionCount === 0
      ? "Nenhum Boost"
      : `${message.guild.premiumSubscriptionCount} Boost(s) ( Level Server: ${message.guild.premiumTier} )`;

  let channels = [
    `Categorias: ${
      message.guild.channels.cache.filter((x) => x.type == "category").size
    }`,
    `Texto: ${
      message.guild.channels.cache.filter((x) => x.type == "text").size
    }`,
    `Voz: ${
      message.guild.channels.cache.filter((x) => x.type == "voice").size
    }`,
  ].join("\n");

  const SERVERINFO = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addFields(
      { name: "ID do servidor:", value: message.guild.id, inline: true },
      {
        name: "Proprietário:",
        value: message.guild.owner.user.tag,
        inline: true,
      },
      {
        name: "Data de criação:",
        value: `${moment(message.guild.createAt).format("L")} ${moment(
          message.guild.createAt
        )
          .startOf("day")
          .fromNow()}`,
      },
      {
        name: "Data da minha entrada:",
        value: `${moment(message.guild.member(client.user.id).joinedAt).format(
          "L"
        )} ( ${moment(message.guild.member(client.user.id).joinedAt)
          .startOf("day")
          .fromNow()} )`,
        inline: true,
      },
      { name: "Total de impulsos:", value: boost },
      {
        name: "Total de membros:",
        value: message.guild.memberCount.toLocaleString(),
        inline: true,
      },
      {
        name: "Total de Bots:",
        value: message.guild.members.cache
          .filter((x) => x.user.bot)
          .size.toLocaleString(),
        inline: true,
      },
      {
        name: `Total de canais: (**${message.guild.channels.cache.size}** )`,
        value: channels,
      }
    )
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setColor(process.env.ECOLOR);

  message.quote(SERVERINFO);
};
exports.help = {
  name: "serverinfo",
  aliases: ["si"],
  description: "Comando para saber as informações do servidor",
  usage: "<prefix>serverinfo",
  category: "information"
};
