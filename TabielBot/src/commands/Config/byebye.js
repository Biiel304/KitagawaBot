const Guild = require("../../database/Schemas/Guild");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.quote(
      `${message.author} calma ai engraçadinho, você não tem permissão para usar este comando!`
    );

  Guild.findOne({ _id: message.guild.id }, async function (err, server) {
    if (args[0] == "canal") {
      let canal =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((x) => x.id == args[1]);

      if (!canal) {
        return message.quote(
          `${message.author}, insira um canal ou me informe um id bobinho(a)`
        );
      } else if (canal.id === server.byebye.channel) {
        return message.quote(
          `${message.author}, esse canal já está setado como canal de boas vindas!`
        );
      } else {
        message.quote(
          `${message.author}, o <#${canal.id}> foi setado como o canal de **boas vindas** como sucesso!`
        );

        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "byebye.channel": canal.id } }
        );
      }

      return;
    }
    if (args[0] == "msg") {
      let msg = args.slice(1).join(" ");

      if (!msg) {
        return message.quote(
          `${message.author}, comando vazio! Você deve inserir uma mensagem!`
        );
      }
      if (msg.lenth > 100) {
        return message.quote(
          `${message.author}, Não tenho 1TB de armazenamento!!! Sua mensagem exedeu o máximo de **100** caracteres!`
        );
      } else if (msg == server.byebye.msg) {
        return message.quote(
          `${message.author}, Cade a criatifidade??? Essa menságem já está setada! coloque outra...`
        );
      } else {
        message.quote(
          `Prontinho ${message.author}, mudei a mensagem de saída com sucesso!!! Me paga um açaí depois tá?`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "byebye.msg": msg } }
        );
      }

      return;
    }

    if (args[0] == "on") {
      if (server.byebye.status) {
        return message.quote(
          `${message.author}, o sistema já se encontra ativado.`
        );
      } else {
        message.quote(
          `${message.author}, sistema de boas vindas ativado com sucesso.`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "byebye.status": true } }
        );
      }

      return;
    }

    if (args[0] == "off") {
      if (!server.byebye.status) {
        return message.quote(
          `${message.author}, o sistema já se encontra desativado.`
        );
      } else {
        message.quote(
          `${message.author}, sistema de boas vindas desativado. com sucesso.`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "byebye.status": false } }
        );
      }

      return;
    }

    let info = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name} - Sistema de ByeBye`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(
        `Utils\n\n> **{name}** - Coloca o nome do membro\n> **{total}** - pega o total de membros da guild\n> **{guildName}** - Pega o nome do servidor.`
      )
      .addFields(
        {
          name: "Canal setado:",
          value:
            server.byebye.channel == "null"
              ? "Nenhum canal"
              : `<#${server.byebye.channel}>`,
        },
        {
          name: "Mensagem setada:",
          value:
            server.byebye.msg == "null"
              ? "Nenhuma mensagem"
              : `\`\`\`diff\n-${server.byebye.msg}\`\`\``,
        },
        {
          name: "Status do sistema:",
          value: `No momento o sistema se encontra **${
            server.byebye.status ? "ativado" : "desativado"
          }**`,
        }
      )
      .setColor(process.env.EMBED_COLOR)
      .setFooter(
        `Comando requisitado por: **${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTimestamp();

    message.quote(info);
  });
};

exports.help = {
  name: "byebye",
  aliases: ["setbyebye"],
  description: "Comando para configurar o sistema de byebye.",
  usage: "<prefix>byebye",
  category: "Config"
};
