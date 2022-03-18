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
      } else if (canal.id === server.welcome.channel) {
        return message.quote(
          `${message.author}, esse canal já está setado como canal de boas vindas!`
        );
      } else {
        message.quote(
          `${message.author}, o <#${canal.id}> foi setado como o canal de **boas vindas** como sucesso!`
        );

        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "welcome.channel": canal.id } }
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
      } else if (msg == server.welcome.msg) {
        return message.quote(
          `${message.author}, Cade a criatifidade??? Essa menságem já está setada! coloque outra...`
        );
      } else {
        message.quote(
          `Prontinho ${message.author}, mudei a mensagem de boas vindas com sucesso!!! Me paga um açaí depois tá?`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "welcome.msg": msg } }
        );
      }

      return;
    }

    if (args[0] == "on") {
      if (server.welcome.status) {
        return message.quote(
          `${message.author}, o sistema já se encontra ativado.`
        );
      } else {
        message.quote(
          `${message.author}, sistema de boas vindas ativado com sucesso.`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "welcome.status": true } }
        );
      }

      return;
    }

    if (args[0] == "off") {
      if (!server.welcome.status) {
        return message.quote(
          `${message.author}, o sistema já se encontra desativado.`
        );
      } else {
        message.quote(
          `${message.author}, sistema de boas vindas desativado. com sucesso.`
        );
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "welcome.status": false } }
        );
      }

      return;
    }

    let info = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name} - Sistema de welcome`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(
        `Utils\n\n> **{member}** - Mencione o membro\n> **{name}** - Coloca o nome do membro\n> **{total}** - pega o total de membros da guild\n> **{guildName}** - Pega o nome do servidor.`
      )
      .addFields(
        {
          name: "Canal setado:",
          value:
            server.welcome.channel == "null"
              ? "Nenhum canal"
              : `<#${server.welcome.channel}>`,
        },
        {
          name: "Mensagem setada:",
          value:
            server.welcome.msg == "null"
              ? "Nenhuma mensagem"
              : `\`\`\`diff\n-${server.welcome.msg}\`\`\``,
        },
        {
          name: "Status do sistema:",
          value: `No momento o sistema se encontra **${
            server.welcome.status ? "ativado" : "desativado"
          }**`,
        }
      )
      .setColor(process.env.EOLOR)
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
  name: "welcome",
  aliases: ["setwelcome"],
  description: "Comando para configurar o sistema de boas vindas do servidor",
  usage: "<prefix>welcome",
  category: "Config"
};
